import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "~/store/cartStore";
import { loadScript, RAZORPAY_PUBLIC_KEY } from "~/lib/utils";
import { useAuthStore } from "~/store/authStore";
import { toast } from "react-toastify";
// Ensure you have a way to access your backend URL
const BACKEND_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface RazorpayInstance {
  open: () => void;
  on: (
    eventName: "payment.failed",
    callback: (response: RazorpayFailedResponse) => void,
  ) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: any) => RazorpayInstance;
  }
}

// These are now strictly required because the backend will provide/expect them
export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayError {
  // ... keep your existing error types ...
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    payment_id: string;
    order_id?: string;
  };
}

export interface RazorpayFailedResponse {
  error: RazorpayError;
}

export interface CheckoutPayload {
  user_id: string;
  address_id?: string;
  items: { product_id: string; quantity: number }[];
  delivery_date: string;
  slot_start_time: string;
  total_amount: number;
  slot_end_time: string;
  delivery_fee?: number;
  coupon_code?: string;
}

export function useRazorpay() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const { user } = useAuthStore();

  const processPayment = async (payload: CheckoutPayload) => {
    setIsProcessing(true);

    try {
      // 1. Create order on YOUR backend
      const orderResponse = await fetch(
        `${BACKEND_API_URL}/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!orderResponse.ok)
        throw new Error("Failed to create order on server");
      const orderData = await orderResponse.json();

      // 2. Load Razorpay SDK
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!res) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // 3. Configure Razorpay Options
      const options = {
        key: RAZORPAY_PUBLIC_KEY, // Use your public key here
        amount: orderData.amount, // Value comes from your backend now
        currency: orderData.currency,
        name: "The Better Desserts",
        description: "Delicious treats heading your way!",
        image: "https://the-better-desserts.vercel.app/brand/logo.png",
        order_id: orderData.id, // THE CRUCIAL PART: Pass the backend order ID

        // 4. Handle Success -> Verify on Backend
        handler: async function (response: RazorpaySuccessResponse) {
          setIsVerifying(true);
          try {
            // VERIFY THE SIGNATURE ON YOUR BACKEND
            const verifyResponse = await fetch(
              `${BACKEND_API_URL}/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              },
            );

            if (!verifyResponse.ok)
              throw new Error("Payment verification failed");

            // Only clear cart and navigate if verification succeeds
            console.log("Payment Verified Successfully!");
            if (clearCart) clearCart();

            navigate("/order-confirmation", {
              state: { paymentId: response.razorpay_payment_id },
            });
          } catch (error) {
            console.error(error);
            alert(
              "Payment verification failed. If money was deducted, it will be refunded.",
            );
          } finally {
            setIsVerifying(false);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.fname ?? "Test User", // Ideally dynamically populated from your user state
          email: user?.email ?? "test@example.com",
          contact: user?.phone_number ?? "9999999999",
        },
        theme: {
          color: "#1A243F",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      // 5. Open the modal
      const paymentObject = new window.Razorpay(options);

      paymentObject.on(
        "payment.failed",
        async function (response: RazorpayFailedResponse) {
          console.error("Razorpay Error:", response.error.code);
          try {
            // Notify your backend that the payment failed!
            await fetch(`${BACKEND_API_URL}/payment/fail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              // Razorpay attaches the order_id to the error metadata
              body: JSON.stringify({
                razorpay_order_id: response.error.metadata.order_id,
              }),
            });
          } catch (err) {
            console.error(
              "Failed to update backend about payment failure",
              (err as Error).message,
            );
          }
          toast.error(`Payment Failed: ${response.error.description}`);
          setIsProcessing(false);
        },
      );

      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert(
        (error as Error).message || "Something went wrong initializing payment",
      );
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing, isVerifying };
}

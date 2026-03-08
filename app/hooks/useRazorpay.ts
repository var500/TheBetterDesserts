import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "~/store/cartStore";
import { loadScript } from "~/lib/utils";

interface RazorpayInstance {
  open: () => void;
  on: (
    eventName: "payment.failed",
    callback: (response: RazorpayFailedResponse) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: any) => RazorpayInstance;
  }
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string; // Optional now, required later with backend
  razorpay_signature?: string; // Optional now, required later with backend
}

export interface RazorpayError {
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

// --- Hook ---

export function useRazorpay() {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  const processPayment = async (totalAmount: number) => {
    setIsProcessing(true);

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    // 2. Configure Razorpay Options
    const options = {
      key: "",
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      name: "The Better Desserts",
      description: "Delicious treats heading your way!",
      image: "https://the-better-desserts.vercel.app/brand/logo.png",

      // 3. Handle the Success Callback (Strongly Typed)
      handler: function (response: RazorpaySuccessResponse) {
        console.log("Payment Successful!", response);

        if (clearCart) clearCart();

        navigate("/order-confirmation", {
          state: { paymentId: response.razorpay_payment_id },
        });
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
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

    // 4. Open the Razorpay Modal
    const paymentObject = new window.Razorpay(options);

    // 5. Catch errors (Strongly Typed)
    paymentObject.on(
      "payment.failed",
      function (response: RazorpayFailedResponse) {
        console.error("Razorpay Error:", response.error.code);
        alert(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      },
    );

    paymentObject.open();
  };

  return { processPayment, isProcessing };
}

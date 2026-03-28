import React, { useState, useEffect } from "react";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { useNavigate } from "react-router";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { toast } from "react-toastify";

import DeliveryMethodSelector from "./DeliveryMethodSelector";
import PickupDetails from "./PickupDetails";
import CouponSection from "./CouponSection";
import OrderSummary from "./OrderSummary";
import OrderSchedule from "./OrderSchedule";
import { useAuthStore } from "~/store/authStore";
import { useCheckoutStore } from "~/store/checkoutStore";
import { ContactStep, OtpVerificationStep } from "./AuthStep";
import { useAddresses } from "~/hooks/useAddress";
import { getZoneFromPincode } from "~/lib/utils";
import AddressManager from "./AddressManager";

import { useCoupon } from "~/hooks/useCoupon";
import { useValidateCart } from "~/hooks/useProducts";
import type { CartValidationError } from "~/common/types";

const mockCalculateShipping = async (
  destinationPincode: string,
): Promise<number> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      let distanceKm = 15;
      if (destinationPincode.startsWith("11")) distanceKm = 35;
      else if (!destinationPincode.startsWith("12")) distanceKm = 100;
      resolve(distanceKm * 10);
    }, 800),
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  const { cart } = useCartStore();
  const { selectedCityId } = useCityStore();
  const { step, setStep } = useCheckoutStore();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledSlot, setScheduledSlot] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(
    null,
  );
  const [appliedDiscountPercent, setAppliedDiscountPercent] =
    useState<number>(0);
  const [backendDiscountAmount, setBackendDiscountAmount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState("");

  const { data: fetchedAddresses } = useAddresses(user?.uid);
  const addresses = fetchedAddresses || [];

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.is_default);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else {
        setSelectedAddressId(addresses[addresses.length - 1].id);
      }
    }
  }, [addresses, selectedAddressId]);

  const selectedAddr = addresses.find((a) => a.id === selectedAddressId);
  const deliveryZone = selectedAddr
    ? getZoneFromPincode(selectedAddr.pin_code)
    : null;

  const isAddressDeliverable =
    selectedAddr && deliveryZone
      ? cart.every((item) => {
          if (!item.availableIn || item.availableIn.length === 0) return true;
          return item.availableIn.includes(deliveryZone);
        })
      : false;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.base_price * item.quantity,
    0,
  );

  const discountedSubtotal = subtotal - backendDiscountAmount;
  const currentShipping = shippingFee || 0;
  const taxableAmount = discountedSubtotal + currentShipping;

  const gstAmount = taxableAmount * 0.05;

  const total = taxableAmount + gstAmount;
  const { mutate: validateCart, isPending: isValidatingCart } =
    useValidateCart();

  useEffect(() => {
    if (cart.length === 0) return;

    let zoneToCheck = deliveryZone;

    if (deliveryMethod === "pickup") {
      zoneToCheck = "GURGAON";
    }

    if (deliveryMethod === "delivery" && !zoneToCheck) return;

    const payload = {
      zone: zoneToCheck as string,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    validateCart(payload, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        if (err?.response?.errors && err.response.errors.length > 0) {
          err.response.errors.forEach((errorItem: CartValidationError) => {
            toast.error(errorItem.message);
          });
        } else if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error("Some items in your cart are no longer available.");
        }
      },
    });
  }, [cart, deliveryZone, deliveryMethod]);

  useEffect(() => {
    if (user?.uid && step !== "DELIVERY_AND_PAYMENT") {
      setStep("DELIVERY_AND_PAYMENT");
    }
  }, [user?.uid, step, setStep]);

  useEffect(() => {
    const calculateShipping = async () => {
      if (deliveryMethod === "pickup") {
        setShippingFee(0);
        return;
      }
      if (!selectedAddressId) {
        setShippingFee(null);
        return;
      }

      setIsCalculatingShipping(true);
      const selectedAddr = addresses.find((a) => a.id === selectedAddressId);
      if (selectedAddr) {
        const cost = await mockCalculateShipping(selectedAddr.pin_code);
        setShippingFee(cost);
      }
      setIsCalculatingShipping(false);
    };
    calculateShipping();
  }, [selectedAddressId, addresses, deliveryMethod]);

  const { mutate: applyCoupon, isPending: isVerifyingCoupon } = useCoupon(
    (data) => {
      setAppliedDiscountPercent(data.discountPercentage);
      setBackendDiscountAmount(data.discountAmount);
      setAppliedCouponCode(data.code);
      setCouponMessage(`Awesome! You saved ₹${data.discountAmount}`);
    },
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (!token) {
      toast.error("Please log in to apply coupons.");
      return;
    }

    setCouponMessage("");

    applyCoupon({
      code: couponCode.trim(),
      cartTotal: subtotal,
      token: token,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscountPercent(0);
    setBackendDiscountAmount(0);
    setAppliedCouponCode(null);
    setCouponCode("");
    setCouponMessage("");
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F0E6] px-4">
        <Icons.ShoppingBag className="text-primary-dark/20 mb-6 h-24 w-24" />
        <Text
          as="h2"
          className="text-primary-dark mb-4 text-center text-4xl md:text-5xl"
        >
          Oops! Your cart is completely crumb-free.
        </Text>
        <Text
          as="p"
          className="text-primary-dark/70 mb-8 max-w-md text-center text-lg"
        >
          A balanced diet is a brookie in each hand. Let&apos;s go find some
          sweet treats to fill this up!
        </Text>
        <Button
          variant="default"
          size="lg"
          className="rounded-full px-12 font-bold tracking-wider transition-transform hover:-translate-y-1"
          onClick={() => navigate("/collection")}
        >
          Explore the Menu
        </Button>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen bg-[#F5F0E6] px-4 pt-12 pb-24 md:px-8">
      {isValidatingCart && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F0E6]/60 backdrop-blur-sm">
          <Icons.Refresh className="text-primary-dark mb-4 h-12 w-12 animate-spin" />
          <Text
            as="h2"
            className="text-primary-dark text-xl font-bold tracking-widest uppercase"
          >
            Checking Cart Availability...
          </Text>
        </div>
      )}
      <div className="mx-auto flex max-w-6xl flex-col-reverse gap-0 md:flex-col md:gap-12 lg:flex-row">
        <div className="flex-1">
          <Text
            as="h1"
            className="text-primary-dark border-primary-dark/10 mb-8 border-b pb-4 text-4xl md:text-5xl"
          >
            Checkout
          </Text>

          {step === "CONTACT" && <ContactStep />}
          {step === "OTP_VERIFICATION" && <OtpVerificationStep />}

          {step === "DELIVERY_AND_PAYMENT" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
              <DeliveryMethodSelector
                selectedCityId={selectedCityId}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
              />

              {deliveryMethod === "delivery" ? (
                <div className="space-y-4">
                  {user?.uid && (
                    <AddressManager
                      token={token!}
                      userId={user.uid}
                      selectedAddressId={selectedAddressId}
                      setSelectedAddressId={setSelectedAddressId}
                    />
                  )}
                  {selectedAddr && !isAddressDeliverable && (
                    <div className="animate-in fade-in rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                      <Text
                        as="p"
                        variant={"primary"}
                        className="text-sm text-red-500"
                      >
                        Sorry, one or more items in your cart cannot be
                        delivered to {selectedAddr.pin_code}.
                      </Text>
                    </div>
                  )}
                </div>
              ) : (
                <PickupDetails />
              )}

              {(deliveryMethod === "pickup" ||
                (deliveryMethod === "delivery" && isAddressDeliverable)) && (
                <OrderSchedule
                  deliveryMethod={deliveryMethod}
                  scheduledDate={scheduledDate}
                  setScheduledDate={setScheduledDate}
                  scheduledSlot={scheduledSlot}
                  setScheduledSlot={setScheduledSlot}
                />
              )}

              <CouponSection
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                appliedDiscountPercent={appliedDiscountPercent}
                couponMessage={couponMessage}
                isApplyingCoupon={isVerifyingCoupon}
                handleApplyCoupon={handleApplyCoupon}
                handleRemoveCoupon={handleRemoveCoupon}
              />
            </div>
          )}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discountAmount={backendDiscountAmount}
          appliedDiscountPercent={appliedDiscountPercent}
          shippingFee={shippingFee}
          isCalculatingShipping={isCalculatingShipping}
          total={total}
          gstAmount={gstAmount}
          deliveryMethod={deliveryMethod}
          selectedAddressId={selectedAddressId}
          scheduledDate={scheduledDate}
          scheduledSlot={scheduledSlot}
          isAddressDeliverable={isAddressDeliverable}
          couponCode={appliedCouponCode}
        />
      </div>
    </div>
  );
}

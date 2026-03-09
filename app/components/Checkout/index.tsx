import React, { useState, useEffect } from "react";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { useNavigate } from "react-router";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";

// Import sub-components
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

const mockVerifyCoupon = async (
  code: string,
): Promise<{ success: boolean; discountPercent?: number; message: string }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (code.toUpperCase() === "SWEET10")
        resolve({
          success: true,
          discountPercent: 10,
          message: "10% off applied!",
        });
      else
        resolve({ success: false, message: "Invalid or expired coupon code." });
    }, 600),
  );
};

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
  const { cart } = useCartStore();
  const { selectedCityId } = useCityStore();
  const navigate = useNavigate();
  const { step, setStep } = useCheckoutStore();
  const { user } = useAuthStore();
  // State
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
  const [appliedDiscountPercent, setAppliedDiscountPercent] =
    useState<number>(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
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

          // Check if the calculated zone is in the product's available zones
          return item.availableIn.includes(deliveryZone);
        })
      : false;
  // Derived Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = Math.floor((subtotal * appliedDiscountPercent) / 100);
  const total = subtotal - discountAmount + (shippingFee || 0);

  useEffect(() => {
    if (user?.uid && step !== "DELIVERY_AND_PAYMENT") {
      setStep("DELIVERY_AND_PAYMENT");
    }
  }, [user?.uid, step, setStep]);

  // Effects
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

  // Handlers
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMessage("");

    const res = await mockVerifyCoupon(couponCode);
    if (res.success && res.discountPercent) {
      setAppliedDiscountPercent(res.discountPercent);
      setCouponMessage(res.message);
    } else {
      setAppliedDiscountPercent(0);
      setCouponMessage(res.message);
    }
    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscountPercent(0);
    setCouponCode("");
    setCouponMessage("");
  };

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col items-center justify-center px-4">
        <Icons.ShoppingBag className="w-24 h-24 text-primary-dark/20 mb-6" />
        <Text
          as="h2"
          className="text-4xl md:text-5xl font-frista text-primary-dark mb-4 text-center"
        >
          Oops! Your cart is completely crumb-free.
        </Text>
        <Text
          as="p"
          className="text-lg text-primary-dark/70 text-center max-w-md mb-8"
        >
          A balanced diet is a brookie in each hand. Let&apos;s go find some
          sweet treats to fill this up!
        </Text>
        <Button
          variant="default"
          size="lg"
          className="rounded-full px-12 font-bold tracking-wider hover:-translate-y-1 transition-transform"
          onClick={() => navigate("/collection")}
        >
          Explore the Menu
        </Button>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-col  lg:flex-row gap-0 md:gap-12">
        <div className="flex-1">
          <Text
            as="h1"
            className="text-4xl md:text-5xl font-frista text-primary-dark border-b border-primary-dark/10 pb-4 mb-8"
          >
            Checkout
          </Text>

          {/* Render Step 1: Email */}
          {step === "CONTACT" && <ContactStep />}

          {/* Render Step 2: OTP */}
          {step === "OTP_VERIFICATION" && <OtpVerificationStep />}

          {/* Render Step 3: The existing delivery flow! */}
          {step === "DELIVERY_AND_PAYMENT" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <DeliveryMethodSelector
                selectedCityId={selectedCityId}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
              />

              {deliveryMethod === "delivery" ? (
                <div className="space-y-4">
                  {user?.uid && (
                    <AddressManager
                      userId={user.uid}
                      // 2. Pass the state down!
                      selectedAddressId={selectedAddressId}
                      setSelectedAddressId={setSelectedAddressId}
                    />
                  )}
                  {/* Show error if address is selected but not deliverable */}
                  {selectedAddr && !isAddressDeliverable && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in">
                      <Text as="p" className="text-red-500 font-bold text-sm">
                        Sorry, one or more items in your cart cannot be
                        delivered to {selectedAddr.pin_code}. Please select a
                        different address.
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
                isApplyingCoupon={isApplyingCoupon}
                handleApplyCoupon={handleApplyCoupon}
                handleRemoveCoupon={handleRemoveCoupon}
              />
            </div>
          )}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          appliedDiscountPercent={appliedDiscountPercent}
          shippingFee={shippingFee}
          isCalculatingShipping={isCalculatingShipping}
          total={total}
          deliveryMethod={deliveryMethod}
          selectedAddressId={selectedAddressId}
          scheduledDate={scheduledDate}
          scheduledSlot={scheduledSlot}
          isAddressDeliverable={isAddressDeliverable}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { useNavigate } from "react-router";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import type { Address } from "~/common/types";

// Import sub-components
import DeliveryMethodSelector from "./DeliveryMethodSelector";
import AddressSelection from "./AddressSelection";
import PickupDetails from "./PickupDetails";
import CouponSection from "./CouponSection";
import OrderSummary from "./OrderSummary";

// Mocks (Keep these at the top or move to a separate utilities file)
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

const SAVED_ADDRESSES: Address[] = [
  {
    id: "addr_1",
    name: "John Doe",
    street: "DLF Phase 3, Block U",
    city: "Gurgaon",
    pincode: "122002",
    phone: "9876543210",
  },
];

export default function Checkout() {
  const { cart } = useCartStore();
  const { selectedCityId } = useCityStore();
  const navigate = useNavigate();

  // State
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    SAVED_ADDRESSES[0]?.id || null,
  );

  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] =
    useState<number>(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Derived Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = Math.floor((subtotal * appliedDiscountPercent) / 100);
  const total = subtotal - discountAmount + (shippingFee || 0);

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
        const cost = await mockCalculateShipping(selectedAddr.pincode);
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

  const handleAddNewAddress = (newAddr: Address) => {
    setAddresses([...addresses, newAddr]);
    setSelectedAddressId(newAddr.id);
  };

  // Empty Cart Render
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
          A balanced diet is a brookie in each hand. Let's go find some sweet
          treats to fill this up!
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
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <Text
            as="h1"
            className="text-4xl md:text-5xl font-frista text-primary-dark border-b border-primary-dark/10 pb-4 mb-8"
          >
            Checkout
          </Text>

          <DeliveryMethodSelector
            selectedCityId={selectedCityId}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />

          {deliveryMethod === "delivery" ? (
            <AddressSelection
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
              onAddNewAddress={handleAddNewAddress}
            />
          ) : (
            <PickupDetails />
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

        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          discountAmount={discountAmount}
          appliedDiscountPercent={appliedDiscountPercent}
          shippingFee={shippingFee}
          isCalculatingShipping={isCalculatingShipping}
          total={total}
          deliveryMethod={deliveryMethod}
          selectedAddressId={selectedAddressId}
        />
      </div>
    </div>
  );
}

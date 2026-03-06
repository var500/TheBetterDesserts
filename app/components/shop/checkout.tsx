import React, { useState, useEffect } from "react";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore"; // 👈 Import city store
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useNavigate } from "react-router";
import type { Address } from "~/common/types";
import { cn } from "~/lib/utils";

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

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    SAVED_ADDRESSES[0]?.id || null,
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] =
    useState<number>(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = Math.floor((subtotal * appliedDiscountPercent) / 100);
  const total = subtotal - discountAmount + (shippingFee || 0);

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

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.pincode.length !== 6)
      return alert("Valid 6 digit pincode required");
    const newAddrObj: Address = { ...newAddress, id: Date.now().toString() };
    setAddresses([...addresses, newAddrObj]);
    setSelectedAddressId(newAddrObj.id);
    setIsAddingNew(false);
    setNewAddress({ name: "", street: "", city: "", pincode: "", phone: "" });
  };

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

  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <Text
            as="h1"
            className="text-4xl md:text-5xl font-frista text-primary-dark border-b border-primary-dark/10 pb-4"
          >
            Checkout
          </Text>

          {selectedCityId === "gurgaon" && (
            <div className="flex bg-white rounded-full p-1 border border-primary-dark/10 w-max shadow-sm">
              <button
                className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  deliveryMethod === "delivery"
                    ? "bg-primary-dark text-white shadow-md"
                    : "text-primary-dark/60 hover:text-primary-dark hover:bg-primary-dark/5"
                }`}
                onClick={() => setDeliveryMethod("delivery")}
              >
                Delivery
              </button>
              <button
                className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  deliveryMethod === "pickup"
                    ? "bg-primary-dark text-white shadow-md"
                    : "text-primary-dark/60 hover:text-primary-dark hover:bg-primary-dark/5"
                }`}
                onClick={() => setDeliveryMethod("pickup")}
              >
                Store Pickup
              </button>
            </div>
          )}

          {deliveryMethod === "delivery" ? (
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2">
              <Text
                as="h2"
                className="text-2xl font-bold text-primary-dark mb-6"
              >
                Delivery Address
              </Text>

              {!isAddingNew ? (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? "border-primary-dark bg-primary-dark/5"
                          : "border-gray-200 hover:border-primary-dark/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        className="mt-1 mr-4 accent-primary-dark w-4 h-4"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div>
                        <Text as="p" className="font-bold text-primary-dark">
                          {addr.name}
                        </Text>
                        <Text
                          as="p"
                          className="text-sm text-primary-dark/70 mt-1"
                        >
                          {addr.street}, {addr.city}
                        </Text>
                        <Text as="p" className="text-sm text-primary-dark/70">
                          Pincode: {addr.pincode}
                        </Text>
                        <Text as="p" className="text-sm text-primary-dark/70">
                          Phone: {addr.phone}
                        </Text>
                      </div>
                    </label>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-dashed"
                    onClick={() => setIsAddingNew(true)}
                  >
                    + Add New Address
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="space-y-4 animate-in fade-in slide-in-from-top-4"
                >
                  <div className="text-primary-dark grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      className=" w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                    />
                    <input
                      required
                      placeholder="Phone Number"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={10}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                    />
                  </div>
                  <input
                    required
                    placeholder="Complete Street Address"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                    />
                    <input
                      required
                      placeholder="Pincode (6 digits)"
                      value={newAddress.pincode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          pincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={6}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsAddingNew(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      className="rounded-xl flex-1"
                    >
                      Save & Deliver Here
                    </Button>
                  </div>
                </form>
              )}
            </section>
          ) : (
            // 👈 PICKUP DETAILS SECTION
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2">
              <Text
                as="h2"
                className="text-2xl font-bold text-primary-dark mb-2"
              >
                Store Pickup
              </Text>
              <Text as="p" className="text-primary-dark/70 mb-6">
                Your order will be ready for pickup at our bakery.
              </Text>

              <div className="p-4 bg-[#F5F0E6] rounded-2xl border border-primary-dark/10">
                <Text as="h4" className="font-bold text-primary-dark text-lg">
                  The Better Desserts
                </Text>
                <Text as="p" className="text-primary-dark/80 mt-1">
                  Second floor, S-10, Baani square
                </Text>
                <Text as="p" className="text-primary-dark/80">
                  Gurgaon, Haryana 122018
                </Text>
                <Text
                  as="p"
                  className="text-sm font-medium text-primary-dark/60 mt-3"
                >
                  Pickup Hours: 10:00 AM - 9:00 PM
                </Text>
              </div>
            </section>
          )}

          {/* COUPON SECTION */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5">
            <Text as="h2" className="text-xl font-bold text-primary-dark mb-4">
              Have a Coupon?
            </Text>
            <form onSubmit={handleApplyCoupon} className="flex gap-3">
              {/* ... (Coupon form remains completely unchanged) ... */}
              <input
                placeholder="Enter code (e.g., SWEET10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={appliedDiscountPercent > 0}
                className={cn(
                  `flex-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark uppercase`,
                  appliedDiscountPercent ? "opacity-50" : "",
                )}
              />
              {appliedDiscountPercent > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl hover:text-primary-dark border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                  onClick={() => {
                    setAppliedDiscountPercent(0);
                    setCouponCode("");
                    setCouponMessage("");
                  }}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  className="rounded-xl"
                  disabled={isApplyingCoupon}
                >
                  {isApplyingCoupon ? "Checking..." : "Apply"}
                </Button>
              )}
            </form>
            {couponMessage && (
              <Text
                as="p"
                className={`text-sm mt-3 font-medium ${
                  appliedDiscountPercent > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {couponMessage}
              </Text>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Order Summary (Sticky) */}
        <div className="w-full lg:w-100">
          <div className="sticky top-24 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-dark/5">
            <Text as="h2" className="text-2xl font-bold text-primary-dark mb-6">
              Order Summary
            </Text>

            {/* Items */}
            <div className="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Text
                      as="h4"
                      className="font-bold text-sm text-primary-dark line-clamp-1"
                    >
                      {item.name}
                    </Text>
                    <Text
                      as="p"
                      className="text-xs text-primary-dark/60 mt-0.5"
                    >
                      Qty: {item.quantity}
                    </Text>
                  </div>
                  <Text as="p" className="font-bold text-sm text-primary-dark">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </Text>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-primary-dark/70">
                <Text as="p">Subtotal</Text>
                <Text as="p" className="font-medium">
                  ₹{subtotal.toLocaleString()}
                </Text>
              </div>

              {appliedDiscountPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <Text as="p">Discount ({appliedDiscountPercent}%)</Text>
                  <Text as="p" className="font-medium">
                    - ₹{discountAmount.toLocaleString()}
                  </Text>
                </div>
              )}

              {/* 👈 Shipping Line Item reflects Pickup */}
              <div className="flex justify-between text-primary-dark/70">
                <Text as="p">Shipping</Text>
                {deliveryMethod === "pickup" ? (
                  <Text as="p" className="font-medium text-green-600">
                    Free Pickup
                  </Text>
                ) : isCalculatingShipping ? (
                  <Text as="p" className="animate-pulse text-xs">
                    Calculating...
                  </Text>
                ) : shippingFee !== null ? (
                  <Text as="p" className="font-medium">
                    ₹{shippingFee.toLocaleString()}
                  </Text>
                ) : (
                  <Text as="p" className="text-xs">
                    Select address
                  </Text>
                )}
              </div>
            </div>

            <div className="border-t border-primary-dark/10 mt-4 pt-4 flex justify-between items-center">
              <Text as="h3" className="text-xl font-black text-primary-dark">
                Total
              </Text>
              <Text as="h3" className="text-xl font-black text-primary-dark">
                ₹{total.toLocaleString()}
              </Text>
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full rounded-2xl mt-8 font-bold text-lg"
              disabled={
                (deliveryMethod === "delivery" && !selectedAddressId) ||
                isCalculatingShipping
              }
            >
              Proceed to Payment
            </Button>

            {deliveryMethod === "delivery" && !selectedAddressId && (
              <Text
                as="p"
                className="text-xs text-center text-red-500 mt-3 font-medium"
              >
                Please select a delivery address to continue.
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

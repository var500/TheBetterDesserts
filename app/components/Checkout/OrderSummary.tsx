import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import type { Product } from "~/common/types";
import { Icons } from "../icons";
import { useCartStore } from "~/store/cartStore";

interface CartItem extends Product {
  quantity: number;
}

interface OrderSummaryProps {
  subtotal: number;
  discountAmount: number;
  appliedDiscountPercent: number;
  shippingFee: number | null;
  isCalculatingShipping: boolean;
  total: number;
  deliveryMethod: "delivery" | "pickup";
  selectedAddressId: string | null;
  scheduledDate: string;
  scheduledSlot: string;
}

export default function OrderSummary({
  subtotal,
  discountAmount,
  appliedDiscountPercent,
  shippingFee,
  isCalculatingShipping,
  total,
  deliveryMethod,
  selectedAddressId,
  scheduledDate,
  scheduledSlot,
}: OrderSummaryProps) {
  const { cart, removeFromCart } = useCartStore();

  const isCheckoutDisabled =
    (deliveryMethod === "delivery" && !selectedAddressId) ||
    !scheduledDate ||
    !scheduledSlot ||
    isCalculatingShipping;

  let tooltipMessage = "";
  if (deliveryMethod === "delivery" && !selectedAddressId) {
    tooltipMessage = "Please select a delivery address.";
  } else if (!scheduledDate || !scheduledSlot) {
    tooltipMessage = "Please select a date and time slot.";
  } else if (isCalculatingShipping) {
    tooltipMessage = "Calculating shipping...";
  }

  return (
    <div className="w-full lg:w-100">
      <div className="sticky top-24 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-dark/5">
        <Text as="h2" className="text-2xl font-bold text-primary-dark mb-6">
          Order Summary
        </Text>

        <div className="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group relative flex gap-4 items-center"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Text
                  as="h4"
                  className="font-bold text-sm text-primary-dark line-clamp-1 pr-6" // Added padding-right so long names don't hit the price
                >
                  {item.name}
                </Text>
                <div className="flex items-center gap-3 mt-1">
                  <Text as="p" className="text-xs text-primary-dark/60">
                    Qty: {item.quantity}
                  </Text>

                  {/* Remove Button - Subtle, text-based, or small icon next to Qty */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] cursor-pointer uppercase font-bold tracking-wider text-red-500/70 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <Text
                as="p"
                className="font-bold text-sm text-primary-dark shrink-0"
              >
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

        <div
          className={`relative group w-full mt-8 ${
            isCheckoutDisabled ? "cursor-not-allowed" : ""
          }`}
        >
          <Button
            variant="default"
            size="sm-to-default"
            className={`w-full rounded-2xl font-bold text-lg ${
              isCheckoutDisabled ? "pointer-events-none" : ""
            }`}
            disabled={isCheckoutDisabled}
          >
            Proceed to Payment
          </Button>

          {isCheckoutDisabled && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max max-w-xs px-4 py-2.5 bg-primary-dark text-white text-xs font-bold tracking-wide rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-xl pointer-events-none">
              {tooltipMessage}

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-primary-dark" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

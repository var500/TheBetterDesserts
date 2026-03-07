import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import type { Product } from "~/common/types";

interface CartItem extends Product {
  quantity: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedDiscountPercent: number;
  shippingFee: number | null;
  isCalculatingShipping: boolean;
  total: number;
  deliveryMethod: "delivery" | "pickup";
  selectedAddressId: string | null;
}

export default function OrderSummary({
  cart,
  subtotal,
  discountAmount,
  appliedDiscountPercent,
  shippingFee,
  isCalculatingShipping,
  total,
  deliveryMethod,
  selectedAddressId,
}: OrderSummaryProps) {
  return (
    <div className="w-full lg:w-100">
      <div className="sticky top-24 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-dark/5">
        <Text as="h2" className="text-2xl font-bold text-primary-dark mb-6">
          Order Summary
        </Text>

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
                <Text as="p" className="text-xs text-primary-dark/60 mt-0.5">
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
  );
}

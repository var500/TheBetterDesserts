import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface CartActionsProps {
  quantity: number;
  allowedToAdd: number;
  isOutOfStock: boolean;
  isAddToCartDisabled: boolean;
  isPincodeValid: boolean | null;
  deliveryDate: string;
  deliverySlot: string;
  handleQuantityChange: (delta: number) => void;
  handleAddToCart: () => void;
}

export default function CartActions({
  quantity,
  allowedToAdd,
  isOutOfStock,
  isAddToCartDisabled,
  isPincodeValid,
  deliveryDate,
  deliverySlot,
  handleQuantityChange,
  handleAddToCart,
}: CartActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center justify-between border border-gray-200 bg-white rounded-full px-4 py-1 w-full sm:w-32 shrink-0 h-16">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1 || isAddToCartDisabled}
          className="p-2 text-primary-dark/60 hover:text-primary-dark disabled:opacity-30 transition-colors"
        >
          <Icons.Minus className="w-5 h-5" />
        </button>
        <Text
          as="span"
          className={`font-bold w-6 text-center text-lg ${
            isAddToCartDisabled ? "text-primary-dark/30" : "text-primary-dark"
          }`}
        >
          {quantity}
        </Text>
        <button
          onClick={() => handleQuantityChange(1)}
          disabled={quantity >= allowedToAdd || isAddToCartDisabled}
          className="p-2 text-primary-dark/60 hover:text-primary-dark disabled:opacity-30 transition-colors"
        >
          <Icons.Plus className="w-5 h-5" />
        </button>
      </div>

      <Button
        variant="default"
        size="lg"
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
        className={`flex-1 rounded-full h-16 text-sm tracking-widest uppercase font-bold transition-all ${
          isAddToCartDisabled
            ? "bg-gray-400 text-white cursor-not-allowed shadow-none"
            : "shadow-lg hover:-translate-y-1"
        }`}
      >
        {allowedToAdd === 0 && !isOutOfStock
          ? "Max Limit Reached"
          : isOutOfStock
            ? "Out of Stock"
            : isPincodeValid === true && (!deliveryDate || !deliverySlot)
              ? "Select Date & Slot"
              : "Add to Cart"}
      </Button>
    </div>
  );
}

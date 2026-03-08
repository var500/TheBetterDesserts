import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Text } from "../ui/text";

interface CartActionsProps {
  quantity: number;
  allowedToAdd: number;
  isOutOfStock: boolean;
  isAddToCartDisabled: boolean;
  isPincodeValid: boolean | null;
  handleQuantityChange: (delta: number) => void;
  handleAddToCart: () => void;
}

export default function CartActions({
  quantity,
  allowedToAdd,
  isOutOfStock,
  isAddToCartDisabled,
  isPincodeValid,
  handleQuantityChange,
  handleAddToCart,
}: CartActionsProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Quantity Selector & Add to Cart Button */}
      <div className="flex gap-4 h-14">
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl w-32 shrink-0">
          <button
            type="button"
            className="w-10 h-full flex items-center justify-center text-primary-dark/60 hover:text-primary-dark hover:bg-gray-50 rounded-l-2xl transition-colors disabled:opacity-50"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1 || isOutOfStock}
          >
            <Icons.Minus className="w-4 h-4" />
          </button>

          <span className="flex-1 text-center font-bold text-primary-dark">
            {quantity}
          </span>

          <button
            type="button"
            className="w-10 h-full flex items-center justify-center text-primary-dark/60 hover:text-primary-dark hover:bg-gray-50 rounded-r-2xl transition-colors disabled:opacity-50"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= allowedToAdd || isOutOfStock}
          >
            <Icons.Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          className="flex-1 h-full rounded-2xl text-base font-bold tracking-wide uppercase shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-all"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Bag"}
        </Button>
      </div>

      {/* Helper text to prompt the user to enter a pincode if they haven't yet */}
      {isPincodeValid === null && !isOutOfStock && (
        <Text as="p" className="text-sm text-primary-dark/60 text-center mt-2">
          Please check delivery availability above to add this item to your bag.
        </Text>
      )}

      {/* Warning if they hit the max limit */}
      {allowedToAdd === 0 && !isOutOfStock && (
        <Text as="p" className="text-sm text-[#A32A2A] text-center mt-2">
          You&apos;ve reached the maximum quantity limit for this item.
        </Text>
      )}
    </div>
  );
}

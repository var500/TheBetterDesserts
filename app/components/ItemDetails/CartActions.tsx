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
    <div className="mb-8 flex flex-col gap-4">
      {/* Quantity Selector & Add to Cart Button */}
      <div className="flex h-14 gap-4">
        <div className="flex w-32 shrink-0 items-center rounded-2xl border border-gray-200 bg-white">
          <button
            type="button"
            className="text-primary-dark/60 hover:text-primary-dark flex h-full w-10 items-center justify-center rounded-l-2xl transition-colors hover:bg-gray-50 disabled:opacity-50"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1 || isOutOfStock}
          >
            <Icons.Minus className="h-4 w-4" />
          </button>

          <span className="text-primary-dark flex-1 text-center font-bold">
            {quantity}
          </span>

          <button
            type="button"
            className="text-primary-dark/60 hover:text-primary-dark flex h-full w-10 items-center justify-center rounded-r-2xl transition-colors hover:bg-gray-50 disabled:opacity-50"
            onClick={() => handleQuantityChange(1)}
            disabled={
              quantity >= allowedToAdd || isOutOfStock || !isPincodeValid
            }
          >
            <Icons.Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          className="h-full flex-1 rounded-2xl text-base font-bold tracking-wide uppercase shadow-md transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Bag"}
        </Button>
      </div>

      {/* Helper text to prompt the user to enter a pincode if they haven't yet */}
      {isPincodeValid === null && !isOutOfStock && (
        <Text as="p" className="text-primary-dark/60 mt-2 text-center text-sm">
          Please check delivery availability above to add this item to your bag.
        </Text>
      )}

      {/* Warning if they hit the max limit */}
      {allowedToAdd === 0 && !isOutOfStock && (
        <Text as="p" className="mt-2 text-center text-sm text-[#A32A2A]">
          You&apos;ve reached the maximum quantity limit for this item.
        </Text>
      )}
    </div>
  );
}

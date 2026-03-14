import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

interface CouponSectionProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedDiscountPercent: number;
  couponMessage: string;
  isApplyingCoupon: boolean;
  handleApplyCoupon: (e: React.FormEvent) => void;
  handleRemoveCoupon: () => void;
}

export default function CouponSection({
  couponCode,
  setCouponCode,
  appliedDiscountPercent,
  couponMessage,
  isApplyingCoupon,
  handleApplyCoupon,
  handleRemoveCoupon,
}: CouponSectionProps) {
  return (
    <section className="border-primary-dark/5 mb-8 rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <Text as="h2" className="text-primary-dark mb-4 text-xl font-bold">
        Have a Coupon?
      </Text>
      <form
        onSubmit={handleApplyCoupon}
        className="md:flex-wor flex flex-col gap-3"
      >
        <input
          placeholder="Enter code (e.g., SWEET10)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          disabled={appliedDiscountPercent > 0}
          className={cn(
            `focus:border-primary-dark flex-1 rounded-xl border border-gray-200 p-3 uppercase outline-none`,
            appliedDiscountPercent ? "opacity-50" : "",
          )}
        />
        {appliedDiscountPercent > 0 ? (
          <Button
            type="button"
            variant="outline"
            className="hover:text-primary-dark rounded-xl border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50"
            onClick={handleRemoveCoupon}
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
          className={`mt-3 text-sm font-medium ${appliedDiscountPercent > 0 ? "text-green-600" : "text-red-500"}`}
        >
          {couponMessage}
        </Text>
      )}
    </section>
  );
}

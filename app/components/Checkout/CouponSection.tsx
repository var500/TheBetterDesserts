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
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 mb-8">
      <Text as="h2" className="text-xl font-bold text-primary-dark mb-4">
        Have a Coupon?
      </Text>
      <form onSubmit={handleApplyCoupon} className="flex gap-3">
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
          className={`text-sm mt-3 font-medium ${appliedDiscountPercent > 0 ? "text-green-600" : "text-red-500"}`}
        >
          {couponMessage}
        </Text>
      )}
    </section>
  );
}

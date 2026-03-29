import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useCartStore } from "~/store/cartStore";
import { useRazorpay, type CheckoutPayload } from "~/hooks/useRazorpay";
import { useAuthStore } from "~/store/authStore";
import { Icons } from "../icons";

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
  gstAmount: number;
  isAddressDeliverable: boolean;
  couponCode?: string | null;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  roundOffAmount: number;
}

export default function OrderSummary({
  subtotal,
  discountAmount,
  appliedDiscountPercent,
  shippingFee,
  isCalculatingShipping,
  total,
  gstAmount,
  deliveryMethod,
  selectedAddressId,
  scheduledDate,
  scheduledSlot,
  couponCode,
  isAddressDeliverable,
  isFreeShipping,
  freeShippingThreshold,
  roundOffAmount,
}: OrderSummaryProps) {
  const { cart, removeFromCart } = useCartStore();
  const { user } = useAuthStore();

  const { processPayment, isProcessing, isVerifying } = useRazorpay();

  const handleCheckoutClick = () => {
    if (!user?.uid || !selectedAddressId || !scheduledDate || !scheduledSlot)
      return;

    const [startStr, endStr] = scheduledSlot.split(" - ");

    const createDateString = (dateStr: string, timeStr: string) => {
      const d = new Date(`${dateStr} ${timeStr}`);
      return d.toISOString();
    };

    const payload: CheckoutPayload = {
      user_id: user.uid,
      address_id: selectedAddressId,
      total_amount: total,
      delivery_fee: shippingFee ?? undefined,
      delivery_date: new Date(scheduledDate).toISOString(),
      slot_start_time: createDateString(scheduledDate, startStr),
      slot_end_time: createDateString(scheduledDate, endStr),
      coupon_code: couponCode || undefined,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    processPayment(payload);
  };

  const isCheckoutDisabled =
    (deliveryMethod === "delivery" &&
      (!selectedAddressId || !isAddressDeliverable)) ||
    !scheduledDate ||
    !scheduledSlot ||
    isCalculatingShipping;

  let tooltipMessage = "";
  if (deliveryMethod === "delivery" && !selectedAddressId) {
    tooltipMessage = "Please select a delivery address.";
  } else if (deliveryMethod === "delivery" && !isAddressDeliverable) {
    tooltipMessage = "Cannot deliver to the selected address.";
  } else if (!scheduledDate || !scheduledSlot) {
    tooltipMessage = "Please select a date and time slot.";
  } else if (isCalculatingShipping) {
    tooltipMessage = "Calculating shipping...";
  }

  const amountShort = freeShippingThreshold - subtotal;
  const progressPercentage = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );

  return (
    <div className="w-full lg:w-100">
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F0E6]/80 backdrop-blur-sm">
          <Icons.Loader className="text-primary-dark mb-6 h-12 w-12 animate-spin" />
          <Text
            as="h2"
            className="text-primary-dark mb-2 px-4 text-center text-2xl font-bold tracking-widest uppercase"
          >
            Securing Your Payment...
          </Text>
          <Text
            as="p"
            className="text-primary-dark/70 px-4 text-center text-sm font-medium"
          >
            Please do not refresh or close this page.
          </Text>
        </div>
      )}
      <div className="border-primary-dark/5 sticky top-24 mb-10 rounded-3xl border bg-white p-6 shadow-lg md:mb-0 md:p-8">
        <Text as="h2" className="text-primary-dark mb-6 text-2xl font-bold">
          Order Summary
        </Text>

        {/* --- NEW FREE SHIPPING LOGIC --- */}
        {deliveryMethod === "delivery" && (
          <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            {/* If they have unlocked it, OR if they are within ₹1000 of unlocking it, show the progress bar */}
            {isFreeShipping || amountShort <= 1000 ? (
              <>
                <div className="mb-2 flex items-center justify-between">
                  <Text
                    variant={"primary"}
                    as="p"
                    className="text-primary-dark text-sm font-semibold"
                  >
                    {isFreeShipping
                      ? "🎉 You've unlocked FREE Delivery!"
                      : `Add items worth ₹${amountShort.toLocaleString()} more for FREE Delivery`}
                  </Text>
                </div>
                {/* Progress Bar Track */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  {/* Progress Bar Fill */}
                  <div
                    className={`h-full transition-all duration-500 ease-out ${
                      isFreeShipping
                        ? "bg-green-500"
                        : "bg-primary-dark border-primary-dark border"
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </>
            ) : (
              /* If they are further away than ₹1000, just show a friendly helper text */
              <div className="flex items-center justify-center text-center">
                <Text
                  variant={"primary"}
                  as="p"
                  className="text-primary-dark text-sm font-semibold"
                >
                  🚚 Free delivery on orders above ₹
                  {freeShippingThreshold.toLocaleString()}
                </Text>
              </div>
            )}
          </div>
        )}
        <div className="mb-6 max-h-75 space-y-4 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group relative flex items-center gap-4"
            >
              {/* Image */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Text
                  as="h4"
                  className="text-primary-dark line-clamp-1 pr-6 text-sm font-bold"
                >
                  {item.name}
                </Text>
                <div className="mt-1 flex items-center gap-3">
                  <Text as="p" className="text-primary-dark/60 text-xs">
                    Qty: {item.quantity}
                  </Text>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer text-[10px] font-bold tracking-wider text-red-500/70 uppercase transition-colors hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <Text
                as="p"
                variant={"primary"}
                className="text-primary-dark shrink-0 text-sm font-bold"
              >
                ₹{(item.base_price * item.quantity).toLocaleString()}
              </Text>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="text-primary-dark/70 flex justify-between">
            <Text as="p">Subtotal</Text>
            <Text as="p" className="font-medium" variant={"primary"}>
              ₹{subtotal.toLocaleString()}
            </Text>
          </div>

          {appliedDiscountPercent > 0 && (
            <div className="flex justify-between text-green-600">
              <Text as="p">Discount ({appliedDiscountPercent}%)</Text>
              <Text as="p" className="font-medium" variant={"primary"}>
                - ₹{discountAmount.toLocaleString()}
              </Text>
            </div>
          )}

          {isAddressDeliverable && (
            <div className="text-primary-dark/70 flex justify-between">
              <Text as="p">Shipping</Text>
              {deliveryMethod === "pickup" ? (
                <Text as="p" className="font-medium text-green-600">
                  Free Pickup
                </Text>
              ) : isCalculatingShipping ? (
                <Text as="p" className="animate-pulse text-xs">
                  Calculating...
                </Text>
              ) : isFreeShipping ? (
                <div className="flex items-center gap-2">
                  {shippingFee && (
                    <Text as="span" className="text-xs line-through opacity-50">
                      ₹{shippingFee.toLocaleString()}
                    </Text>
                  )}
                  <Text as="p" className="font-bold text-green-600">
                    FREE
                  </Text>
                </div>
              ) : shippingFee !== null ? (
                <Text as="p" className="font-medium" variant={"primary"}>
                  ₹{shippingFee.toLocaleString()}
                </Text>
              ) : (
                <Text as="p" className="text-xs">
                  Select address
                </Text>
              )}
            </div>
          )}

          <div className="text-primary-dark/70 flex justify-between pt-1">
            <Text as="p">GST (5%)</Text>
            <Text as="p" variant={"primary"} className="font-medium">
              ₹
              {gstAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </div>
          {roundOffAmount !== 0 && (
            <div className="text-primary-dark/70 flex justify-between pt-1">
              <Text as="p" variant={"primary"} className="text-xs">
                Round Off
              </Text>
              <Text as="p" variant={"primary"} className="text-xs font-medium">
                {roundOffAmount > 0 ? "+" : "-"} ₹
                {Math.abs(roundOffAmount).toFixed(2)}
              </Text>
            </div>
          )}
        </div>

        <div className="border-primary-dark/10 mt-4 flex items-center justify-between border-t pt-4">
          <Text as="h3" className="text-primary-dark text-xl font-black">
            Total
          </Text>
          <Text
            as="h3"
            variant={"primary"}
            className="text-primary-dark text-xl font-black"
          >
            ₹{total.toLocaleString()}
          </Text>
        </div>

        <div
          className={`group relative mt-8 w-full ${
            isCheckoutDisabled ? "cursor-not-allowed" : ""
          }`}
        >
          <Button
            variant="default"
            size="sm-to-default"
            onClick={handleCheckoutClick}
            className={`w-full rounded-2xl text-lg font-bold ${
              isCheckoutDisabled || isProcessing
                ? "pointer-events-none opacity-80"
                : ""
            }`}
            disabled={isCheckoutDisabled || isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </Button>

          {isCheckoutDisabled && (
            <div className="bg-primary-dark pointer-events-none invisible absolute top-full left-1/2 z-10 mt-3 w-max max-w-xs -translate-x-1/2 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide text-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {tooltipMessage}
              <div className="border-b-primary-dark absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

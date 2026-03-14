import { useState } from "react";
import { toast } from "react-toastify";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import type { OrderDetailsResponse } from "~/common/types";

interface OrderCardProps {
  order: OrderDetailsResponse;
  onReorder: () => void;
}

export default function OrderCard({ order, onReorder }: OrderCardProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [note, setNote] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setIsSubmittingFeedback(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setFeedbackSubmitted(true);
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const isDelivered = order.order_status === "DELIVERED";

  return (
    <div className="border-primary-dark/5 flex flex-col gap-6 rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      {/* Top Section: Order Details */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Text as="h3" className="text-primary-dark text-lg font-bold">
              Order #{order.id.slice(-6).toUpperCase()}
            </Text>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.order_status}
            </span>
          </div>

          <Text as="p" className="text-primary-dark/60 text-sm">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </Text>

          {/* Conditional Delivery Date */}
          {isDelivered && order.delivery_date && (
            <Text as="p" className="mt-1 text-sm font-semibold text-green-600">
              Delivered on {new Date(order.delivery_date).toLocaleDateString()}
            </Text>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.map((item, idx: number) => (
                <span
                  key={idx}
                  className="text-primary-dark border-primary-dark/10 rounded-full border bg-[#F5F0E6] px-3 py-1 text-xs"
                >
                  {/* Access the newly included product name! */}
                  {item.quantity}x {item.product.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-primary-dark/10 flex w-full flex-col items-end gap-3 border-t pt-4 md:w-auto md:border-t-0 md:pt-0">
          <Text as="p" className="text-primary-dark text-xl font-black">
            ₹{order.total_amount}
          </Text>
          <Button
            variant="outline"
            onClick={onReorder}
            className="border-primary-dark text-primary-dark hover:bg-primary-dark w-full rounded-xl transition-all hover:text-white md:w-auto"
          >
            Repeat Order
          </Button>
        </div>
      </div>

      {/* Bottom Section: Feedback UI (Only show if delivered and not yet rated) */}
      {isDelivered && !feedbackSubmitted && (
        <div className="border-primary-dark/10 animate-in fade-in mt-2 border-t pt-6">
          <Text as="h4" className="text-primary-dark mb-3 font-bold">
            How was your order?
          </Text>

          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <svg
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Reveal textarea once they click a star */}
          {rating > 0 && (
            <div className="animate-in slide-in-from-top-2 space-y-3">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tell us what you loved (or what we can improve)..."
                className="border-primary-dark/20 focus:border-primary-dark h-24 w-full resize-none rounded-xl border bg-gray-50 p-3 text-sm outline-none"
              />
              <Button
                onClick={handleFeedbackSubmit}
                disabled={isSubmittingFeedback}
                className="rounded-xl px-6"
              >
                {isSubmittingFeedback ? "Sending..." : "Submit Feedback"}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Feedback Success State */}
      {feedbackSubmitted && (
        <div className="border-primary-dark/10 mt-2 border-t pt-4">
          <Text
            as="p"
            className="flex items-center gap-2 font-bold text-green-600"
          >
            ✓ Feedback submitted successfully!
          </Text>
        </div>
      )}
    </div>
  );
}

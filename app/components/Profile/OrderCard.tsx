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
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 flex flex-col gap-6">
      {/* Top Section: Order Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Text as="h3" className="text-lg font-bold text-primary-dark">
              Order #{order.id.slice(-6).toUpperCase()}
            </Text>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
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
            <Text as="p" className="text-green-600 font-semibold text-sm mt-1">
              Delivered on {new Date(order.delivery_date).toLocaleDateString()}
            </Text>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex flex-wrap gap-2 mt-4">
              {order.items.map((item, idx: number) => (
                <span
                  key={idx}
                  className="text-xs bg-[#F5F0E6] text-primary-dark px-3 py-1 rounded-full border border-primary-dark/10"
                >
                  {/* Access the newly included product name! */}
                  {item.quantity}x {item.product.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-primary-dark/10">
          <Text as="p" className="font-black text-xl text-primary-dark">
            ₹{order.total_amount}
          </Text>
          <Button
            variant="outline"
            onClick={onReorder}
            className="w-full md:w-auto rounded-xl border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-all"
          >
            Repeat Order
          </Button>
        </div>
      </div>

      {/* Bottom Section: Feedback UI (Only show if delivered and not yet rated) */}
      {isDelivered && !feedbackSubmitted && (
        <div className="pt-6 border-t border-primary-dark/10 mt-2 animate-in fade-in">
          <Text as="h4" className="font-bold text-primary-dark mb-3">
            How was your order?
          </Text>

          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-8 h-8 ${
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
            <div className="space-y-3 animate-in slide-in-from-top-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tell us what you loved (or what we can improve)..."
                className="w-full p-3 border border-primary-dark/20 rounded-xl outline-none focus:border-primary-dark text-sm bg-gray-50 resize-none h-24"
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
        <div className="pt-4 border-t border-primary-dark/10 mt-2">
          <Text
            as="p"
            className="text-green-600 font-bold flex items-center gap-2"
          >
            ✓ Feedback submitted successfully!
          </Text>
        </div>
      )}
    </div>
  );
}

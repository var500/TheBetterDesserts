import React from "react";
import { Text } from "../ui/text";
import { Icons } from "../icons";

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
  "07:00 PM - 09:00 PM",
];

interface OrderScheduleProps {
  deliveryMethod: "delivery" | "pickup";
  scheduledDate: string;
  setScheduledDate: (date: string) => void;
  scheduledSlot: string;
  setScheduledSlot: (slot: string) => void;
}

export default function OrderSchedule({
  deliveryMethod,
  scheduledDate,
  setScheduledDate,
  scheduledSlot,
  setScheduledSlot,
}: OrderScheduleProps) {
  // Get today's date in YYYY-MM-DD format to prevent past date selection
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8">
      <Text as="h2" className="text-2xl font-bold text-primary-dark mb-2">
        {deliveryMethod === "delivery" ? "Delivery Schedule" : "Pickup Time"}
      </Text>
      <Text as="p" className="text-primary-dark/70 mb-6">
        {deliveryMethod === "delivery"
          ? "When would you like your order delivered?"
          : "When will you come to pick up your order?"}
      </Text>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Date Picker */}
        <div className="relative w-full sm:w-auto flex-1">
          <input
            type="date"
            min={today}
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full p-4 pr-10 border border-gray-200 rounded-2xl text-base font-bold text-primary-dark focus:border-primary-dark outline-none transition-all bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-dark/50">
            <Icons.Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Time Slot Picker */}
        <div className="w-full sm:w-auto flex-1 relative">
          <select
            value={scheduledSlot}
            onChange={(e) => setScheduledSlot(e.target.value)}
            className="w-full p-4 appearance-none border border-gray-200 rounded-2xl text-base font-bold text-primary-dark focus:border-primary-dark outline-none transition-all bg-white"
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {/* Custom Chevron for select */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-dark/50">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

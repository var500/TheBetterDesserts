import React, { useEffect, useMemo, useState } from "react";
import { Text } from "../ui/text";

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
  // 1. Get exact current time metrics
  // Add this near your other hooks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const todayObj = new Date();
  const currentHour = todayObj.getHours();

  // Adjusting for local timezone offset for string comparison
  const todayStr = new Date(
    todayObj.getTime() - todayObj.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const isToday = scheduledDate === todayStr;

  // 2. Dynamically generate the next 3 days for the UI buttons
  const dateOptions = useMemo(() => {
    const options = [];
    const baseDate = new Date();

    for (let i = 0; i < 3; i++) {
      const targetDate = new Date(baseDate);
      targetDate.setDate(targetDate.getDate() + i);

      // Get YYYY-MM-DD safely for local timezone
      const localStr = new Date(
        targetDate.getTime() - targetDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split("T")[0];

      let label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      else {
        // e.g., "Wed, 11 Mar"
        label = targetDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      }

      options.push({ label, value: localStr });
    }
    return options;
  }, []);

  // 3. Filter available slots based on the current hour + 2 buffer
  const availableSlots = useMemo(() => {
    if (!isToday) return TIME_SLOTS;

    return TIME_SLOTS.filter((slot) => {
      const startStr = slot.split(" - ")[0];
      const [time, period] = startStr.split(" ");
      let hour = parseInt(time.split(":")[0], 10);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return hour >= currentHour + 2;
    });
  }, [isToday, currentHour]);

  // 4. Clear the slot if they change the date and previously selected slot is invalid
  useEffect(() => {
    if (scheduledSlot && !availableSlots.includes(scheduledSlot)) {
      setScheduledSlot("");
    }
  }, [availableSlots, scheduledSlot, setScheduledSlot]);

  // 5. Format the selected date for the success message
  const formattedFriendlyDate = useMemo(() => {
    if (!scheduledDate) return "";
    const [year, month, day] = scheduledDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, [scheduledDate]);

  return (
    <section className="border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8 rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <Text as="h2" className="text-primary-dark mb-2 text-2xl font-bold">
        {deliveryMethod === "delivery" ? "Delivery Schedule" : "Pickup Time"}
      </Text>
      <Text as="p" className="text-primary-dark/70 mb-6">
        {deliveryMethod === "delivery"
          ? "When would you like your order delivered?"
          : "When will you come to pick up your order?"}
      </Text>

      <div className="flex flex-col gap-6">
        {/* 3-Day Button Selector */}
        <div className="grid w-full grid-cols-3 gap-3">
          {dateOptions.map((opt) => {
            const isSelected = scheduledDate === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setScheduledDate(opt.value)}
                className={`rounded-2xl border px-1 py-2 text-xs font-bold transition-all duration-200 md:px-2 md:py-3 md:text-sm ${
                  isSelected
                    ? "bg-primary-dark border-primary-dark scale-[1.02] text-white shadow-md"
                    : "text-primary-dark/70 hover:border-primary-dark/40 hover:bg-primary-dark/5 border-gray-200 bg-transparent"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Time Slot Picker */}
        {/* Custom Theme Dropdown Picker */}
        <div className="relative w-full max-w-80">
          <button
            type="button"
            disabled={
              !scheduledDate || (isToday && availableSlots.length === 0)
            }
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            // Using onBlur to close the menu if the user clicks away
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="text-primary-dark focus:border-primary-dark flex w-full cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 text-base font-bold transition-all outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
          >
            <span>
              {!scheduledDate
                ? "Select a date first"
                : isToday && availableSlots.length === 0
                  ? "No slots left for today"
                  : scheduledSlot || "Select a time slot"}
            </span>

            {/* Custom Chevron that rotates when open */}
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`text-primary-dark/50 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
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
          </button>

          {/* The Custom Dropdown Menu */}
          {isDropdownOpen && availableSlots.length > 0 && (
            <ul className="bg-primary-light text-primary-dark border-primary-dark/10 animate-in fade-in slide-in-from-top-2 absolute top-full left-0 z-20 mt-2 w-full overflow-hidden rounded-2xl border shadow-xl duration-200">
              {availableSlots.map((slot) => (
                <li
                  key={slot}
                  onClick={() => {
                    setScheduledSlot(slot);
                    setIsDropdownOpen(false);
                  }}
                  className={`cursor-pointer p-4 text-base font-bold transition-colors ${
                    scheduledSlot === slot
                      ? "bg-primary-dark/10" // Slight highlight for the currently selected item
                      : "hover:bg-primary-dark hover:text-white"
                  }`}
                >
                  {slot}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Suggestion message if no slots are available today */}
      {isToday && availableSlots.length === 0 && (
        <Text
          as="p"
          className="animate-in fade-in mt-4 text-sm font-medium text-red-500"
        >
          No more {deliveryMethod} slots available for today. Please select
          tomorrow to view the earliest available times.
        </Text>
      )}

      {/* Confirmation Success Message */}
      {scheduledDate && scheduledSlot && (
        <div className="animate-in fade-in slide-in-from-top-2 mt-6 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/50 p-4">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Text
            as="p"
            className="text-sm leading-relaxed text-green-800 md:text-base"
          >
            Great! Your order will be{" "}
            {deliveryMethod === "delivery" ? "delivered" : "ready for pickup"}{" "}
            on <span className="font-bold">{formattedFriendlyDate}</span>{" "}
            between <span className="font-bold">{scheduledSlot}</span>.
          </Text>
        </div>
      )}
    </section>
  );
}

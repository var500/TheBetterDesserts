import React, { useEffect, useMemo } from "react";
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
  // 1. Get exact current time metrics
  const todayObj = new Date();
  const currentHour = todayObj.getHours();

  // Adjusting for local timezone offset so it doesn't accidentally disable "today" if UTC is a day behind
  const today = new Date(
    todayObj.getTime() - todayObj.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const maxDateObj = new Date(todayObj);
  maxDateObj.setMonth(maxDateObj.getMonth() + 2);
  const maxDate = new Date(
    maxDateObj.getTime() - maxDateObj.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const isToday = scheduledDate === today;

  // 2. Filter available slots based on the current hour + 2 buffer
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

  // 3. Clear the slot if they change the date and their previously selected slot is no longer valid
  useEffect(() => {
    if (scheduledSlot && !availableSlots.includes(scheduledSlot)) {
      setScheduledSlot("");
    }
  }, [availableSlots, scheduledSlot, setScheduledSlot]);

  // 4. Format the selected date for the success message
  const formattedFriendlyDate = useMemo(() => {
    if (!scheduledDate) return "";
    // Split the date string to avoid timezone shifting issues when creating a new Date object
    const [year, month, day] = scheduledDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }); // e.g., "Monday, Mar 9"
  }, [scheduledDate]);

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
            max={maxDate}
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
            disabled={isToday && availableSlots.length === 0}
            className="w-full p-4 appearance-none border border-gray-200 rounded-2xl text-base font-bold text-primary-dark focus:border-primary-dark outline-none transition-all bg-white disabled:bg-gray-50 disabled:opacity-60"
          >
            <option value="" disabled>
              {isToday && availableSlots.length === 0
                ? "No slots left for today"
                : "Select a time slot"}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
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

      {/* Suggestion message if no slots are available today */}
      {isToday && availableSlots.length === 0 && (
        <Text
          as="p"
          className="text-red-500 font-medium text-sm mt-4 animate-in fade-in"
        >
          No more {deliveryMethod} slots available for today. Please select
          tomorrow to view the earliest available times.
        </Text>
      )}

      {/* Confirmation Success Message */}
      {scheduledDate && scheduledSlot && (
        <div className="mt-6 p-4 bg-green-50/50 border border-green-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          {/* Using an inline SVG check icon so it works immediately without you needing to add a new icon */}
          <svg
            className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
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
            className="text-green-800 text-sm md:text-base leading-relaxed"
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

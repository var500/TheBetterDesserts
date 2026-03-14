import React from "react";

interface DeliveryMethodSelectorProps {
  selectedCityId: string | null;
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (method: "delivery" | "pickup") => void;
}

export default function DeliveryMethodSelector({
  selectedCityId,
  deliveryMethod,
  setDeliveryMethod,
}: DeliveryMethodSelectorProps) {
  if (selectedCityId !== "gurgaon") return null;

  return (
    <div className="border-primary-dark/10 mb-8 flex w-max rounded-full border bg-white p-1 shadow-sm">
      <button
        className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 ${
          deliveryMethod === "delivery"
            ? "bg-primary-dark text-white shadow-md"
            : "text-primary-dark/60 hover:text-primary-dark hover:bg-primary-dark/5"
        }`}
        onClick={() => setDeliveryMethod("delivery")}
      >
        Delivery
      </button>
      <button
        className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 ${
          deliveryMethod === "pickup"
            ? "bg-primary-dark text-white shadow-md"
            : "text-primary-dark/60 hover:text-primary-dark hover:bg-primary-dark/5"
        }`}
        onClick={() => setDeliveryMethod("pickup")}
      >
        Store Pickup
      </button>
    </div>
  );
}

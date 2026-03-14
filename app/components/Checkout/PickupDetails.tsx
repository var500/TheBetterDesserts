import React from "react";
import { Text } from "../ui/text";

export default function PickupDetails() {
  return (
    <section className="border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8 rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <Text as="h2" className="text-primary-dark mb-2 text-2xl font-bold">
        Store Pickup
      </Text>
      <Text as="p" className="text-primary-dark/70 mb-6">
        Your order will be ready for pickup at our bakery.
      </Text>

      <div className="border-primary-dark/10 rounded-2xl border bg-[#F5F0E6] p-4">
        <Text as="h4" className="text-primary-dark text-lg font-bold">
          The Better Desserts
        </Text>
        <Text as="p" className="text-primary-dark/80 mt-1">
          Second floor, S-10, Baani square
        </Text>
        <Text as="p" className="text-primary-dark/80">
          Gurgaon, Haryana 122018
        </Text>
        <Text as="p" className="text-primary-dark/60 mt-3 text-sm font-medium">
          Pickup Hours: 10:00 AM - 9:00 PM
        </Text>
      </div>
    </section>
  );
}

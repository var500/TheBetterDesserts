import React from "react";
import { Text } from "../ui/text";

export default function PickupDetails() {
  return (
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8">
      <Text as="h2" className="text-2xl font-bold text-primary-dark mb-2">
        Store Pickup
      </Text>
      <Text as="p" className="text-primary-dark/70 mb-6">
        Your order will be ready for pickup at our bakery.
      </Text>

      <div className="p-4 bg-[#F5F0E6] rounded-2xl border border-primary-dark/10">
        <Text as="h4" className="font-bold text-primary-dark text-lg">
          The Better Desserts
        </Text>
        <Text as="p" className="text-primary-dark/80 mt-1">
          Second floor, S-10, Baani square
        </Text>
        <Text as="p" className="text-primary-dark/80">
          Gurgaon, Haryana 122018
        </Text>
        <Text as="p" className="text-sm font-medium text-primary-dark/60 mt-3">
          Pickup Hours: 10:00 AM - 9:00 PM
        </Text>
      </div>
    </section>
  );
}

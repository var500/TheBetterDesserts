import React, { useState } from "react";
import { Text } from "../ui/text";

// 1. Define the accordion content
const accordionData = [
  {
    id: "about",
    title: "About",
    content:
      "Our hampers are carefully curated to bring you the finest selection of our handcrafted desserts. Every item is baked fresh to order using traditional methods.",
  },
  {
    id: "ingredients",
    title: "Ingredients",
    content:
      "We use only the finest ingredients: organic cacao, almond flour, and natural sweeteners. Absolutely no refined sugar, palm oil, or preservatives.",
  },
  {
    id: "storage",
    title: "Storage & Shelf Life",
    content:
      "Store in a cool, dry place. Best consumed within 10 days of delivery for maximum freshness. Do not refrigerate cookies.",
  },
  {
    id: "allergens",
    title: "Allergen Information",
    content:
      "Contains nuts and dairy. Manufactured in a facility that also processes wheat and soy.",
  },
];

export default function ProductAccordion() {
  // 2. Track which item is currently open (null means all are closed)
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    // If clicking the already open item, close it. Otherwise, open the new one.
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border-primary-dark/20 bg-primary-light w-full border">
      {accordionData.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <div
            key={item.id}
            className="border-primary-dark/20 border-b last:border-b-0"
          >
            {/* Accordion Header / Button */}
            <button
              onClick={() => toggleItem(item.id)}
              className="group hover:bg-primary-dark/5 flex w-full items-stretch justify-between text-left transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex-1 py-5 pr-4 pl-6">
                <Text
                  as="span"
                  variant="secondary"
                  className="text-primary-dark text-xl tracking-wide md:text-2xl"
                >
                  {item.title}
                </Text>
              </div>

              {/* Icon Container with the specific left border from your screenshot */}
              <div className="border-primary-dark/20 text-primary-dark group-hover:bg-primary-dark/10 flex w-16 items-center justify-center border-l transition-colors">
                {isOpen ? (
                  // Minus icon
                  <svg
                    className="h-6 w-6 font-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  // Plus icon
                  <svg
                    className="h-6 w-6 font-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Accordion Content (Animated using CSS Grid) */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <Text
                  as="p"
                  variant="primary"
                  className="px-6 pr-12 pb-6 text-base leading-relaxed text-gray-600"
                >
                  {item.content}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

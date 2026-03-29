import React, { useState } from "react";
import { Text } from "../ui/text";
import type { Product } from "~/common/types";

export default function ProductAccordion({ product }: { product?: Product }) {
  // Track which item is currently open (null means all are closed)
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    // If clicking the already open item, close it. Otherwise, open the new one.
    setOpenItem((prev) => (prev === id ? null : id));
  };

  // Define the accordion content dynamically based on the product prop
  const accordionData = [
    // {
    //   id: "box",
    //   title: "What's in the box?",

    //   content:
    //     product?.storage_instructions &&
    //     product.storage_instructions.length > 0 ? (
    //       <ul className="list-disc space-y-2 pl-4">
    //         {product.storage_instructions.map((instruction, index) => (
    //           <li key={index}>{instruction}</li>
    //         ))}
    //       </ul>
    //     ) : (
    //       "Store in a cool, dry place. Best consumed within 7 days of delivery for maximum freshness."
    //     ),
    // },
    {
      id: "storage",
      title: "Storage & Shelf Life",

      content:
        product?.storage_instructions &&
        product.storage_instructions.length > 0 ? (
          <ul className="list-disc space-y-2 pl-4">
            {product.storage_instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        ) : (
          "Store in a cool, dry place. Best consumed within 7 days of delivery for maximum freshness."
        ),
    },
    {
      id: "allergens",
      title: "Allergen Information",
      content:
        "Contains nuts and dairy. Manufactured in a facility that also processes wheat and soy.",
    },
  ];

  return (
    <div className="border-primary-dark/20 bg-primary-light mb-4 w-full border">
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
              <div className="flex-1 py-3 pr-2 pl-3 md:py-5 md:pr-4 md:pl-6">
                <Text
                  as="span"
                  variant="secondary"
                  className="text-primary-dark text-lg tracking-wide md:text-2xl"
                >
                  {item.title}
                </Text>
              </div>

              {/* Icon Container */}
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

            {/* Accordion Content */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {/* Changed from 'p' to 'div' because a 'p' tag cannot legally contain a 'ul' tag (which we use for storage) */}
                <Text
                  as="div"
                  variant="primary"
                  className="px-3 pr-12 pb-6 text-sm leading-relaxed text-gray-600 md:px-6 md:text-base"
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

import React, { useMemo } from "react";
import type { Product } from "~/common/types";
import { Accordion, type AccordionItemType } from "../ui/accordion";

export default function ProductInfoAccordion({
  product,
}: {
  product?: Product;
}) {
  const accordionData = useMemo(() => {
    const baseData: AccordionItemType[] = [
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

    // Conditionally add the "What's in the box?" section to the top
    if (product?.name === "BROOKIE" || product?.name === "CHOCOCHUNK COOKIES") {
      baseData.unshift({
        id: "box",
        title: "What's in the box?",
        content: (
          <ul className="list-disc space-y-2 pl-4">
            {product.name === "BROOKIE" ? (
              <li>3 Brookies</li>
            ) : (
              <li>3 Chocochunk Cookies</li>
            )}
            <li>1 Jar of dark chocolate sauce</li>
          </ul>
        ),
      });
    }

    return baseData;
  }, [product]);

  // Simply render the reusable UI component with the generated data
  return <Accordion items={accordionData} />;
}

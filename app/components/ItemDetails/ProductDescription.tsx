import React from "react";
import { Text } from "../ui/text";
import { Icons } from "../icons";
import { Locations, type Product, type Zone } from "~/common/types";

interface ProductDescriptionProps {
  product: Product;
  availableLocations: Zone[];
}

export default function ProductDescription({
  product,
  availableLocations,
}: ProductDescriptionProps) {
  return (
    <div className="border-primary-dark/10 border-t pt-6">
      <div className="mb-4 flex cursor-pointer items-center justify-between">
        <Text
          as="h4"
          className="text-primary-dark flex items-center gap-2 font-bold"
        >
          <Icons.MessageSquare className="h-5 w-5" /> Description
        </Text>
        <Icons.Minus className="text-primary-dark/50 h-5 w-5" />
      </div>
      <Text
        as="p"
        className="text-primary-dark/80 text-sm leading-relaxed whitespace-pre-line"
      >
        Indulge in our exquisite {product.name.toLowerCase()}. Made fresh to
        order using only the finest ingredients.
        {availableLocations.includes(Locations.PAN_INDIA)
          ? " Shipped securely anywhere in India."
          : ""}
      </Text>
    </div>
  );
}

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
    <div className="border-t border-primary-dark/10 pt-6">
      <div className="flex justify-between items-center mb-4 cursor-pointer">
        <Text
          as="h4"
          className="font-bold text-primary-dark flex items-center gap-2"
        >
          <Icons.MessageSquare className="w-5 h-5" /> Description
        </Text>
        <Icons.Minus className="w-5 h-5 text-primary-dark/50" />
      </div>
      <Text
        as="p"
        className="text-primary-dark/80 text-sm leading-relaxed whitespace-pre-line"
      >
        {product.unitDescription ? `${product.unitDescription}\n\n` : ""}
        Indulge in our exquisite {product.name.toLowerCase()}. Made fresh to
        order using only the finest ingredients.
        {availableLocations.includes(Locations.PAN_INDIA)
          ? " Shipped securely anywhere in India."
          : ""}
      </Text>
    </div>
  );
}

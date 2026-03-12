import React from "react";
import { Text } from "../ui/text";

interface ProductHeaderProps {
  name: string;
  price: number;
}

export default function ProductHeader({ name, price }: ProductHeaderProps) {
  return (
    <>
      <Text
        as="h1"
        className="text-4xl md:text-5xl lg:text-6xl font-frista text-primary-dark mb-2 uppercase"
      >
        {name}
      </Text>
      <Text
        as="p"
        className="text-2xl font-bold text-primary-dark/90 mb-6 tracking-wide"
      >
        ₹{price}
      </Text>
    </>
  );
}

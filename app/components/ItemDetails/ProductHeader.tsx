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
        className="text-primary-dark mb-2 text-4xl uppercase md:text-5xl lg:text-6xl"
      >
        {name}
      </Text>
      <Text
        as="p"
        variant={"primary"}
        className="text-primary-dark/90 mb-6 text-2xl font-bold tracking-wide"
      >
        ₹{price}
      </Text>
    </>
  );
}

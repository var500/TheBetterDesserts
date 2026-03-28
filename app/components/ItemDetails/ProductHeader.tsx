import { Text } from "../ui/text";

interface ProductHeaderProps {
  name: string;
  unitDescription: string;
  price: number;
}

export default function ProductHeader({
  name,
  price,
  unitDescription,
}: ProductHeaderProps) {
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
        className="text-primary-dark/90 text-2xl font-bold tracking-wide"
      >
        ₹{price}
      </Text>
      <Text
        as="p"
        variant={"primary"}
        className="text-primary-dark text-sm leading-relaxed font-medium whitespace-pre-line"
      >
        {unitDescription ? `${unitDescription}\n\n` : ""}
      </Text>
    </>
  );
}

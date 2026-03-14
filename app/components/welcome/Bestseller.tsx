import { Button } from "../ui/button";
import { ProductCard } from "./ProductCard";
import { Text } from "../ui/text";
import { useNavigate } from "react-router";

import type { Product } from "~/common/types";

export default function Bestseller({
  bestsellers,
  isLoading,
  isError,
}: {
  bestsellers: Product[];
  isLoading: boolean;
  isError: boolean;
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="h2" className="text-primary-dark animate-pulse text-2xl">
          Baking fresh menu...
        </Text>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="p" className="text-red-500">
          Failed to load the menu. Please refresh the page.
        </Text>
      </div>
    );
  }

  return (
    <section className="border-primary-dark/10 border-b bg-[#F5F0E6] px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-16 text-center md:mb-20">
          <Text
            as="h2"
            variant={"secondary"}
            className="text-primary-dark mb-1 text-3xl md:text-4xl"
          >
            Our
          </Text>
          <Text
            as="h3"
            className="text-primary-dark text-4xl tracking-[0.15em] uppercase md:text-5xl"
          >
            Bestsellers
          </Text>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {bestsellers &&
            bestsellers
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
        </div>

        <div className="mt-16 md:mt-20">
          <Button
            variant="outline"
            onClick={() => navigate("/collection")}
            size="lg"
            className="hover:bg-primary-dark px-12 font-bold tracking-wider transition-all duration-300 hover:text-[#F5F0E6]"
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}

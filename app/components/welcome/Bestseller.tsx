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
    <section className="bg-[#F5F0E6] px-4 pt-12 md:px-8 md:pt-24 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-12 text-center md:mb-20">
          <Text
            as="h2"
            variant={"secondary"}
            className="text-primary-dark mb-1 text-2xl md:text-4xl"
          >
            Our
          </Text>
          <Text
            as="h3"
            className="text-primary-dark text-3xl tracking-[0.15em] uppercase md:text-5xl"
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

        <div className="mt-16">
          <Button
            variant="outline"
            onClick={() => navigate("/collection")}
            size="lg"
            className="hover:bg-primary-dark px-12 py-4 font-bold tracking-wider transition-all duration-300 hover:text-[#F5F0E6]"
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}

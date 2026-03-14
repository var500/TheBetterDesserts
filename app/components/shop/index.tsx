import { useState, useMemo, useEffect } from "react";

import { useCityStore } from "~/store/useCityStore";
import { Text } from "../ui/text";

import { useCartStore } from "~/store/cartStore";

import PinCodeSelector from "../common/PinCodeSelector";
import { useProducts } from "~/hooks/useProducts";
import type { Product } from "~/common/types";

import { ProductCard } from "./ProductCard";

export default function Shop() {
  const { selectedCityId, selectedCityLabel } = useCityStore();
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { data: products, isLoading, isError } = useProducts();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categoriesWithProducts = useMemo(() => {
    if (!products) return [];

    const categoryMap = new Map();

    products.forEach((product) => {
      const title = product.category.title;
      if (!title) return;

      if (!categoryMap.has(title)) {
        categoryMap.set(title, {
          id: title,
          title,
          description: product.category.description,
          products: [],
        });
      }
      categoryMap.get(title).products.push(product);
    });

    return Array.from(categoryMap.values());
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center">
        <Text
          as="h2"
          className="text-2xl font-frista text-primary-dark animate-pulse"
        >
          Baking fresh menu...
        </Text>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center">
        <Text as="p" className="text-red-500 font-satoshi">
          Failed to load the menu. Please refresh the page.
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <header className="text-center space-y-6 max-w-2xl mx-auto">
          <Text
            as="h1"
            className="text-5xl md:text-7xl font-frista text-primary-dark"
          >
            Our Menu
          </Text>

          {!isMounted ? null : !selectedCityId ? (
            <PinCodeSelector />
          ) : (
            <Text as="p" className="text-lg text-primary-dark/70">
              Showing menu available for{" "}
              {selectedCityLabel === "GURGAON"
                ? "Pickup / delivery in"
                : "delivery in"}{" "}
              <span className="font-bold text-primary-dark uppercase">
                {selectedCityId.replace("-", " ")}
              </span>
            </Text>
          )}
        </header>

        {selectedCityId && (
          <main className="flex flex-col gap-16 w-full">
            {categoriesWithProducts.map((category) => (
              <section key={category.id} className="flex flex-col gap-6">
                <div className="border-b border-primary-dark/10 pb-4">
                  <Text
                    as="h2"
                    className="text-3xl md:text-4xl font-frista text-primary-dark"
                  >
                    {category.title}
                  </Text>
                  <Text as="p" className="text-primary-dark/60 mt-1">
                    {category.description}
                  </Text>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {category.products.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

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

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="h2" className="text-primary-dark animate-pulse text-2xl">
          Baking fresh menu...
        </Text>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="p" className="text-red-500">
          Failed to load the menu. Please refresh the page.
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] px-4 pt-12 pb-24 md:px-8">
      {/* Increased max-w to 7xl to give the new two-column layout more room */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-12">
        <header className="mx-auto max-w-2xl space-y-6 text-center">
          <Text as="h1" className="text-primary-dark text-5xl md:text-7xl">
            Our Menu
          </Text>

          {!isMounted ? null : !selectedCityId ? (
            <PinCodeSelector />
          ) : (
            <Text as="p" className="text-primary-dark/70 text-lg">
              Showing menu available for{" "}
              {selectedCityLabel === "GURGAON"
                ? "Pickup / delivery in"
                : "delivery in"}{" "}
              <span className="text-primary-dark font-bold uppercase">
                {selectedCityId.replace("-", " ")}
              </span>
            </Text>
          )}
        </header>

        {selectedCityId && (
          /* 👇 Wrapper changed to flex-row on desktop for side-by-side layout */
          <div className="relative flex w-full flex-col md:flex-row md:gap-8 lg:gap-12">
            {/* 1. MOBILE ONLY: Horizontal Sticky Nav */}
            <div className="sticky top-20 z-30 -mx-4 mb-6 bg-[#F5F0E6]/90 px-4 py-3 backdrop-blur-md md:hidden">
              <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                {categoriesWithProducts.map((category) => (
                  <button
                    key={`mobile-nav-${category.id}`}
                    onClick={() => scrollToCategory(category.id)}
                    className="border-primary-dark/20 text-primary-dark hover:bg-primary-dark rounded-full border bg-white/50 px-5 py-2 text-sm font-bold tracking-wide whitespace-nowrap uppercase transition-all hover:text-[#F5F0E6]"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. DESKTOP ONLY: Left Sidebar Nav */}
            {categoriesWithProducts.length ? (
              <aside className="hidden shrink-0 md:block md:w-56 lg:w-64">
                <div className="sticky top-28 flex flex-col gap-1">
                  <Text
                    as="h3"
                    className="text-primary-dark border-primary-dark/10 mb-4 border-b pb-3 text-xl font-bold"
                  >
                    Categories
                  </Text>
                  {categoriesWithProducts.map((category) => (
                    <button
                      key={`desktop-nav-${category.id}`}
                      onClick={() => scrollToCategory(category.id)}
                      className="text-primary-dark/70 hover:bg-primary-dark/5 hover:text-primary-dark rounded-lg px-3 py-2.5 text-left text-sm font-bold tracking-wide uppercase transition-colors"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </aside>
            ) : null}

            {/* 3. MAIN CONTENT: Menu Items */}
            <main className="flex w-full flex-1 flex-col gap-16">
              {categoriesWithProducts.map((category) => (
                <section
                  id={`category-${category.id}`}
                  key={category.id}
                  className="flex scroll-mt-32 flex-col gap-6"
                >
                  <div className="border-primary-dark/10 border-b pb-4">
                    <Text
                      as="h2"
                      className="text-primary-dark text-3xl md:text-4xl"
                    >
                      {category.title}
                    </Text>
                    {category.description && (
                      <Text as="p" className="text-primary-dark/60 mt-1">
                        {category.description}
                      </Text>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
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
          </div>
        )}
      </div>
    </div>
  );
}

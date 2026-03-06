import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { useCityStore } from "~/store/useCityStore";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

import { Card } from "../ui/card";
import { useCartStore } from "~/store/cartStore";
import { Locations } from "~/common/types";
import PinCodeSelector from "../common/PinCodeSelector";

import { SHOP_CATEGORIES, AllProducts } from "~/constants";

export default function Shop() {
  const { selectedCityId, selectedCityLabel } = useCityStore();
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Filter the CATEGORIES based on location (not the raw products)
  const visibleCategories = useMemo(() => {
    if (!selectedCityId) return SHOP_CATEGORIES;

    return SHOP_CATEGORIES.filter((category) =>
      category.availableIn.includes(selectedCityLabel as Locations),
    );
  }, [selectedCityId, selectedCityLabel]);

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
              {selectedCityLabel === Locations.GURGAON
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
            {visibleCategories.map((category) => (
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
                  {/* 2. Map over the item IDs, and find the actual product data */}
                  {category.itemIds.map((itemId) => {
                    const product = AllProducts.find((p) => p.id === itemId);

                    if (!product) return null;

                    return (
                      <Card key={product.id} variant="default" radius="default">
                        <Link
                          to={`/product/${product.id}`}
                          className="relative aspect-square overflow-hidden bg-[#E8E3D9] block"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        <div className="p-4 flex flex-col flex-1 justify-between gap-4 ">
                          <div>
                            <Link to={`/product/${product.id}`}>
                              <Text
                                as="h3"
                                className="font-bold text-primary-dark line-clamp-2 hover:underline"
                              >
                                {product.name}
                              </Text>
                            </Link>

                            {/* Updated to use unitDescription */}
                            {product.unitDescription && (
                              <div className=" mb-1 mt-2 w-max inline-flex items-center">
                                <Text
                                  as="span"
                                  className="text-[11px] uppercase tracking-wider font-semibold text-primary-dark/60"
                                >
                                  {product.unitDescription}
                                </Text>
                              </div>
                            )}

                            {/* Added the ₹ symbol back in! */}
                            <Text
                              as="p"
                              className="text-sm text-primary-dark/80 mt-1 font-bold"
                            >
                              ₹{product.price.toLocaleString()}
                            </Text>
                          </div>

                          <Button
                            variant="default"
                            size="sm-to-default"
                            className="w-full rounded-xl py-2 text-sm"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

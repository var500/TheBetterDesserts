import React, { useState, useMemo } from "react";
import { useCityStore } from "~/store/useCityStore";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { PRODUCTS } from "~/constants"; // Adjust path to your data
import { ShopProductCard } from "./shopProductCard";

export default function Shop() {
  const { selectedCityId } = useCityStore();

  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = ["All", "Cake Tubs", "Desserts"];

  // Core Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // 1. Filter by Location (Only show products available in the user's selected city)
    if (selectedCityId) {
      result = result.filter((p) => p.availableIn.includes(selectedCityId));
    }

    // 2. Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 3. Filter by Search Query
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 4. Sort
    if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [selectedCityId, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-8 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* --- LEFT SIDEBAR: FILTERS --- */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <Text
              as="h1"
              className="text-4xl font-frista text-primary-dark mb-6"
            >
              Shop
            </Text>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-primary-dark/10 rounded-xl font-satoshi text-sm focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all"
              />
              <Icons.Search className="absolute left-3 top-3.5 w-4 h-4 text-primary-dark/40" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <Text
              as="h3"
              className="text-xs font-satoshi font-bold uppercase tracking-widest text-primary-dark/60 mb-4"
            >
              Categories
            </Text>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-lg font-satoshi text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary-dark text-[#F5F0E6]"
                      : "text-primary-dark/70 hover:bg-primary-dark/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <Text
              as="h3"
              className="text-xs font-satoshi font-bold uppercase tracking-widest text-primary-dark/60 mb-4"
            >
              Sort By
            </Text>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 bg-white border border-primary-dark/10 rounded-xl font-satoshi text-sm text-primary-dark outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-low-high">Price: Low to High</option>
            </select>
          </div>
        </aside>

        {/* --- RIGHT SIDE: PRODUCT GRID --- */}
        <main className="flex-1">
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            <Text
              as="span"
              className="font-satoshi text-primary-dark/60 text-sm"
            >
              Showing {filteredProducts.length} products
            </Text>

            {!selectedCityId && (
              <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full font-satoshi">
                Please select a city in the header to see available items.
              </span>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  selectedCityId={selectedCityId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl mb-4">🧁</span>
              <Text
                as="h3"
                className="text-2xl font-frista text-primary-dark mb-2"
              >
                No treats found
              </Text>
              <Text as="p" className="font-satoshi text-primary-dark/60">
                Try adjusting your filters or search query.
              </Text>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                variant="outline"
                className="mt-6"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

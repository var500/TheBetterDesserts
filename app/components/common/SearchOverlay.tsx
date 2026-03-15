import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Icons } from "../icons";
import { Text } from "../ui/text";
import { useProducts } from "~/hooks/useProducts";

export const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: products, isLoading } = useProducts();

  const searchResults = useMemo(() => {
    if (!searchTerm.trim() || !products) return [];

    const lowerQuery = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category?.title?.toLowerCase().includes(lowerQuery),
    );
  }, [searchTerm, products]);

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  const handleProductClick = (productId: string) => {
    handleClose();

    navigate(`/product/${productId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-100 flex flex-col bg-[#F5F0E6] duration-300">
      <div className="border-primary-dark/10 flex h-16 shrink-0 items-center border-b bg-white px-4 md:h-20 md:px-8">
        <Icons.Search className="mr-4 h-5 w-5 text-gray-400" />

        <input
          autoFocus
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find a product..."
          className="text-primary-dark flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400 md:text-2xl"
        />

        <Icons.X
          className="hover:text-primary-dark h-8 w-8 cursor-pointer p-1 text-gray-400 transition-colors"
          onClick={handleClose}
        />
      </div>

      {/* Suggestions & Results Body */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto p-4 md:p-8">
        {!searchTerm.trim() ? (
          /* DEFAULT VIEW: Top Sellers */
          <div className="mt-16 flex flex-col items-center">
            <Text
              as="p"
              variant="secondary"
              className="text-primary-dark mb-8 text-3xl"
            >
              Top Sellers
            </Text>

            <div className="flex flex-wrap justify-center gap-4">
              {["Cake tubs", "Brookie", "Brownie"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="border-primary-dark/20 text-primary-dark hover:bg-primary-dark cursor-pointer rounded-full border px-6 py-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#F5F0E6]"
                >
                  <Text as="span" variant="primary">
                    {tag}
                  </Text>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ACTIVE SEARCH VIEW: Filtered Results */
          <div className="w-full max-w-3xl">
            {isLoading ? (
              <p className="text-primary-dark/60 mt-10 animate-pulse text-center text-sm font-bold tracking-wide uppercase">
                Searching the bakery...
              </p>
            ) : searchResults.length > 0 ? (
              <div className="mt-4 flex flex-col gap-2">
                <Text
                  as="p"
                  className="text-primary-dark/60 mb-4 text-sm font-bold tracking-wide uppercase"
                >
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "Result" : "Results"} Found
                </Text>

                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/60"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        // Add safe fallback for images
                        src={product.image?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Text
                        as="span"
                        className="text-primary-dark text-lg font-bold"
                      >
                        {product.name}
                      </Text>
                      <Text
                        as="span"
                        className="text-primary-dark/60 line-clamp-1 text-sm"
                      >
                        {product.category?.title || "Dessert"} • ₹
                        {Number(product.base_price).toLocaleString()}
                      </Text>
                    </div>
                    <Icons.ArrowRight className="text-primary-dark/40 h-5 w-5" />
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE: No Results */
              <div className="mt-20 flex flex-col items-center text-center">
                <Icons.Search className="text-primary-dark/20 mb-4 h-12 w-12" />
                <Text as="p" className="text-primary-dark text-xl font-bold">
                  No desserts found for &quot;{searchTerm}&quot;
                </Text>
                <Text as="p" className="text-primary-dark/60 mt-2">
                  Try searching for &quot;Cake&quot;, &quot;Brownie&quot;, or
                  check your spelling.
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import { memo } from "react";
import { Card } from "../ui/card";
import type { CartItem, Product } from "~/common/types";
import { Link } from "react-router";
import { Text } from "../ui/text";
import { AddToCartButton } from "./AddToCartButton";

export const ProductCard = memo(
  ({
    product,
    addToCart,
  }: {
    product: Product;
    addToCart: (
      product: Omit<CartItem, "quantity">,
      openCart?: boolean,
    ) => void;
  }) => {
    // Check if a second image actually exists to prevent broken image tags
    const hasSecondImage = product.image.length > 1;

    return (
      <Card variant="default" radius="default">
        <Link
          to={`/product/${product.id}`}
          // Added 'group' class here to control child elements on hover
          className="group relative aspect-square overflow-hidden bg-[#E8E3D9] block"
        >
          {/* Primary Image */}
          <img
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            // Changed to absolute positioning to layer the images
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Secondary Hover Image */}
          {hasSecondImage && (
            <img
              src={product.image[1]}
              alt={`${product.name} alternate view`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="p-4 flex flex-col flex-1 justify-between gap-4">
          <div>
            <Link to={`/product/${product.id}`}>
              <Text
                as="h3"
                className="font-bold text-primary-dark line-clamp-2 hover:underline"
              >
                {product.name}
              </Text>
            </Link>

            {product.unitDescription && (
              <div className="mb-1 mt-2 w-max inline-flex items-center">
                <Text
                  as="span"
                  className="text-[11px] uppercase tracking-wider font-semibold text-primary-dark/60"
                >
                  {product.unitDescription}
                </Text>
              </div>
            )}

            <Text
              as="p"
              className="text-sm text-primary-dark/80 mt-1 font-bold"
            >
              ₹{product.base_price}
            </Text>
          </div>

          <AddToCartButton product={product} addToCart={addToCart} />
        </div>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";

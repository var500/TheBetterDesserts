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
          className="group relative block aspect-square overflow-hidden bg-[#E8E3D9]"
        >
          {/* Primary Image */}
          <img
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            // Changed to absolute positioning to layer the images
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Secondary Hover Image */}
          {hasSecondImage && (
            <img
              src={product.image[1]}
              alt={`${product.name} alternate view`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="flex flex-1 flex-col justify-between gap-4 p-2 md:p-4">
          <div>
            <Link to={`/product/${product.id}`}>
              <Text
                as="h3"
                className="text-primary-dark line-clamp-2 font-bold hover:underline"
              >
                {product.name}
              </Text>
            </Link>

            {product.unitDescription && (
              <div className="mt-2 mb-1 inline-flex items-center">
                <Text
                  as="span"
                  variant={"primary"}
                  className="text-primary-dark text-[11px] font-semibold tracking-wider"
                >
                  {product.unitDescription}
                </Text>
              </div>
            )}

            <Text
              as="p"
              variant={"primary"}
              className="text-primary-dark/80 mt-1 text-sm font-bold"
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

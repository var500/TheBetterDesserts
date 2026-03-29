import { useState } from "react";
// Assuming you use an icon library like lucide-react
import { Check, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import type { CartItem, Product } from "~/common/types";

export function AddToCartButton({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (product: Omit<CartItem, "quantity">, openCart?: boolean) => void;
}) {
  const [status, setStatus] = useState("idle");
  const handleAddToCart = async () => {
    setStatus("loading");

    addToCart(product);

    setStatus("success");

    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  return (
    <Button
      variant={"rounded"}
      size="sm"
      className={`h-14 w-full rounded-xl px-2 text-[10px] transition-all duration-300 md:text-sm ${
        status === "success" ? "bg-green-600 text-white hover:bg-green-700" : ""
      }`}
      onClick={handleAddToCart}
      disabled={
        !product.isAvailable || status === "loading" || status === "success"
      }
    >
      {status === "loading" && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {status === "success" && <Check className="mr-2 h-4 w-4" />}
      {status === "idle" && <ShoppingCart className="h-5 w-5 md:mr-2" />}

      {!product.isAvailable
        ? "Sold Out"
        : status === "loading"
          ? "Adding..."
          : status === "success"
            ? "Added"
            : "Add to Cart"}
    </Button>
  );
}

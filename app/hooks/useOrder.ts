// Assuming you have access to your cart store and current product catalog
import { useCartStore } from "~/store/cartStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById, fetchUserOrders } from "~/api/order";

export const useReorder = (currentCatalogProducts: any[]) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleReorder = (pastOrderItems: any[]) => {
    let addedCount = 0;
    let outOfStockCount = 0;

    pastOrderItems.forEach((pastItem) => {
      // Find the LIVE version of the product to check current stock
      const liveProduct = currentCatalogProducts.find(
        (p) => p.id === pastItem.productId,
      );

      // Check if it exists AND is in stock
      if (liveProduct && liveProduct.in_stock) {
        // Add to cart with the quantity they previously ordered
        addToCart({ ...liveProduct, quantity: pastItem.quantity });
        addedCount++;
      } else {
        outOfStockCount++;
      }
    });

    if (addedCount > 0) {
      toast.success("Items added to your cart!");
      navigate("/checkout"); // Send them straight to checkout
    }

    if (outOfStockCount > 0) {
      toast.warn(
        `${outOfStockCount} item(s) are currently out of stock and were skipped.`,
      );
    }

    if (addedCount === 0 && outOfStockCount > 0) {
      toast.error(
        "Sorry, none of the items in this order are currently available.",
      );
    }
  };

  return { handleReorder };
};

export const useOrderDetails = (
  orderId: string | undefined,
  token: string | undefined,
) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId!, token!),
    enabled: !!orderId && !!token,
  });
};

export const useOrderHistory = (token: string | null) => {
  return useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => fetchUserOrders(token!),
    enabled: !!token, // Only run if the user is logged in
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// Assuming you have access to your cart store and current product catalog
import { useCartStore } from "~/store/cartStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminOrderById,
  fetchAdminOrders,
  fetchOrderById,
  fetchShippingCost,
  fetchUserOrders,
  updateAdminOrderStatus,
} from "~/api/order";
import type { PaginatedAdminOrdersResponse } from "~/common/types";
import { useAuthStore } from "~/store/authStore";

export const useReorder = (currentCatalogProducts: any[]) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleReorder = (pastOrderItems: any[]) => {
    let addedCount = 0;
    let outOfStockCount = 0;

    pastOrderItems.forEach((pastItem) => {
      // FIX 1: Use pastItem.product.id (or pastItem.product_id) to match your API payload
      const liveProduct = currentCatalogProducts.find(
        (p) => p.id === (pastItem.product?.id || pastItem.product_id),
      );

      // FIX 2: Ensure you are checking the correct stock/active property.
      // I am using 'is_active' based on your previous JSON, but change it to 'in_stock'
      // ONLY if your catalog items actually have an 'in_stock' boolean.
      if (liveProduct && liveProduct.is_active !== false) {
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
        `${outOfStockCount} item(s) are currently unavailable and were skipped.`,
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

export const useOrderDetails = (orderId: string | undefined) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return fetchOrderById(orderId!, token!);
    },
    enabled: !!orderId && !!token,
  });
};

export const useAdminOrderDetails = (orderId: string | undefined) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["adminOrder", orderId],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return fetchAdminOrderById(orderId!, token);
    },
    enabled: !!orderId && !!token,
  });
};

export const useOrderHistory = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return fetchUserOrders(token!);
    },
    enabled: !!token,
  });
};

export const useAdminOrders = (
  page: number,
  limit: number,
  statusFilter: string,
  token: string | null | undefined,
  search: string,
  dateFilter: string,
) => {
  return useQuery<PaginatedAdminOrdersResponse>({
    queryKey: ["adminOrders", page, limit, statusFilter, search, dateFilter],
    queryFn: () =>
      fetchAdminOrders(page, limit, statusFilter, token!, search, dateFilter),
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
};

export const useUpdateOrderStatus = (token: string | null | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateAdminOrderStatus(id, status, token!),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      queryClient.invalidateQueries({ queryKey: ["adminOrder", variables.id] });
      toast.success("Order status updated!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status.",
      );
    },
  });
};

export const useGetShippingCost = (
  deliveryPincode: string | undefined,
  totalWeightInKg?: number,
  isHyperlocal: boolean = false,
) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["shippingCost", deliveryPincode, isHyperlocal],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      if (!deliveryPincode) {
        throw new Error("Delivery pincode is missing.");
      }

      return fetchShippingCost(
        deliveryPincode,
        token,
        totalWeightInKg,
        isHyperlocal,
      );
    },
    enabled: !!token && !!deliveryPincode,
    retry: false,
  });
};

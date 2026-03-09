// api/orders.ts
import type { OrderDetailsResponse } from "~/common/types";
import { BACKEND_API_URL } from "~/lib/utils";

export const fetchOrderById = async (
  id: string,
  token: string,
): Promise<OrderDetailsResponse> => {
  const response = await fetch(`${BACKEND_API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }

  return response.json();
};

export const fetchUserOrders = async (
  token: string,
): Promise<OrderDetailsResponse[]> => {
  const response = await fetch(`${BACKEND_API_URL}/orders`, {
    // Update to your actual list endpoint
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch order history");
  return response.json();
};

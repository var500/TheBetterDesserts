// api/orders.ts
import type { OrderDetailsResponse } from "~/common/types";
import { BACKEND_API_URL } from "~/lib/utils";

export const fetchOrderById = async (
  id: string,
  token: string,
): Promise<OrderDetailsResponse> => {
  const response = await fetch(`${BACKEND_API_URL}/orders/admin/${id}`, {
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

export const fetchAdminOrders = async (
  page: number,
  limit: number,
  statusFilter: string,
  token: string,
  search: string,
  dateFilter: string,
) => {
  const response = await fetch(
    `${BACKEND_API_URL}/orders/admin?page=${page}&limit=${limit}&status=${statusFilter}&search=${search}&date=${dateFilter}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin orders");
  }

  return response.json();
};

export const updateAdminOrderStatus = async (
  id: string,
  status: string,
  token: string,
) => {
  const response = await fetch(`${BACKEND_API_URL}/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  return response.json();
};

export const fetchShippingCost = async (
  deliveryPincode: string,
  token: string,
  totalWeightInKg?: number,
  isHyperlocal: boolean = false,
): Promise<{ shippingCost: number }> => {
  console.log("isHyperlocal", isHyperlocal);
  const endpoint = isHyperlocal
    ? `${BACKEND_API_URL}/shipping/hyperlocal`
    : `${BACKEND_API_URL}/shipping/calculate`;

  const body = isHyperlocal
    ? JSON.stringify({ deliveryPincode })
    : JSON.stringify({ deliveryPincode, totalWeightInKg });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to calculate shipping cost");
  }

  return response.json();
};

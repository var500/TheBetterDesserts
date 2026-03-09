import type {
  Coupon,
  CreateCouponPayload,
  VerifyCouponResponse,
} from "~/common/types";
import { BACKEND_API_URL } from "~/lib/utils";

export const verifyCouponApi = async (
  code: string,
  cartTotal: number,
  token: string,
): Promise<VerifyCouponResponse> => {
  const response = await fetch(`${BACKEND_API_URL}/coupons/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code, cartTotal }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify coupon");
  }

  return response.json();
};

// Add token parameter
export const getCoupons = async (token: string): Promise<Coupon[]> => {
  const res = await fetch(`${BACKEND_API_URL}/coupons`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return res.json();
};

// Add token parameter
export const createCoupon = async (
  data: CreateCouponPayload,
  token: string,
): Promise<Coupon> => {
  const res = await fetch(`${BACKEND_API_URL}/coupons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
};

// Add token parameter
export const toggleCoupon = async (
  id: string,
  token: string,
): Promise<Coupon> => {
  const res = await fetch(`${BACKEND_API_URL}/coupons/${id}/toggle`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to toggle coupon");
  return res.json();
};

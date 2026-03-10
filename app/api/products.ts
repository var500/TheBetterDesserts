import type {
  AdminProduct,
  Product,
  UpdateProductPayload,
  Zone,
} from "~/common/types";
import { BACKEND_API_URL } from "~/lib/utils";

// For your public storefront (Users)
export const fetchProducts = async (zone?: Zone | null): Promise<Product[]> => {
  const url = new URL(`${BACKEND_API_URL}/catalogue`);
  if (zone) url.searchParams.set("zone", zone);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch products");

  return response.json();
};

// For your Admin Dashboard (Admins)
export const fetchAdminProducts = async (
  token: string,
): Promise<AdminProduct[]> => {
  const url = new URL(`${BACKEND_API_URL}/catalogue/admin`);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch admin products");

  return response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BACKEND_API_URL}/catalogue/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};

export const createProduct = async (
  data: UpdateProductPayload,
  token: string,
) => {
  const response = await fetch(`${BACKEND_API_URL}/catalogue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: string,
  data: UpdateProductPayload,
  token: string,
) => {
  const response = await fetch(`${BACKEND_API_URL}/catalogue/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await fetch(`${BACKEND_API_URL}/catalogue/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

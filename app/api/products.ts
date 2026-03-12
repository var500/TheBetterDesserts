import type {
  AdminProduct,
  FormDataValue,
  Product,
  UpdateProductPayload,
  ValidateCartError,
  ValidateCartPayload,
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

const createProductFormData = <T extends Record<string, FormDataValue>>(
  data: T,
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file: File) => {
        formData.append("images", file);
      });
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File)
    ) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const createProduct = async (
  data: UpdateProductPayload & { images?: File[] },
  token: string,
) => {
  const formData = createProductFormData(data);

  const response = await fetch(`${BACKEND_API_URL}/catalogue`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: string,
  data: UpdateProductPayload & { images?: File[] },
  token: string,
) => {
  const formData = createProductFormData(data);

  const response = await fetch(`${BACKEND_API_URL}/catalogue/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

export const validateCart = async (payload: ValidateCartPayload) => {
  const response = await fetch(`${BACKEND_API_URL}/orders/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Parse the NestJS BadRequestException payload
    const errorData = await response.json();
    return Promise.reject(errorData as ValidateCartError);
  }

  return response.json();
};

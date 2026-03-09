import type { Product, Zone } from "~/common/types";
import { BACKEND_API_URL } from "~/lib/utils";

export const fetchProducts = async (zone?: Zone | null): Promise<Product[]> => {
  const url = new URL(`${BACKEND_API_URL}/catalogue`);

  if (zone) {
    url.searchParams.set("zone", zone);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BACKEND_API_URL}/catalogue/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};

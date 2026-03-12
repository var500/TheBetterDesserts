import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createProduct,
  deleteProduct,
  fetchAdminProducts,
  fetchProductById,
  fetchProducts,
  updateProduct,
  validateCart,
} from "~/api/products";
import type { UpdateProductPayload, ValidateCartPayload } from "~/common/types";
import { useCityStore } from "~/store/useCityStore";

export const useProducts = () => {
  const selectedCityLabel = useCityStore((state) => state.selectedCityLabel);

  return useQuery({
    queryKey: ["products", selectedCityLabel],
    queryFn: () => fetchProducts(selectedCityLabel),
  });
};

export const useGetProductById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id, // Only run the query if an ID exists!
  });
};

export const useAdminProducts = (token: string | null | undefined) => {
  return useQuery({
    queryKey: ["adminProducts"],
    queryFn: () => fetchAdminProducts(token!),
    enabled: !!token,
  });
};

export const useProductMutations = (token: string | null | undefined) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });

  const create = useMutation({
    mutationFn: (data: UpdateProductPayload & { images?: File[] }) =>
      createProduct(data, token!),
    onSuccess: () => {
      toast.success("Product created!");
      invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const update = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductPayload & { images?: File[] };
    }) => updateProduct(id, data, token!),
    onSuccess: () => {
      toast.success("Product updated!");
      invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct(id, token!),
    onSuccess: () => {
      toast.success("Product deactivated.");
      invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return { create, update, remove };
};

export const useValidateCart = () => {
  return useMutation({
    mutationFn: (payload: ValidateCartPayload) => validateCart(payload),
  });
};

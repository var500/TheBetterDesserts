import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "~/api/products";
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

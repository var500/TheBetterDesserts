import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createIngredients,
  getIngredientsAdmin,
  getIngredientsUser,
} from "~/api/products";
import type { IngredientsItem } from "~/common/types";
import { useAuthStore } from "~/store/authStore";

export const useAdminIngredients = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["admin-ingredients"],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return getIngredientsAdmin(token);
    },
    enabled: !!token,
  });
};
export const useIngredients = () => {
  return useQuery({
    queryKey: ["public-ingredients"],
    queryFn: () => getIngredientsUser(),
  });
};

// 2. Create New Ingredient
export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      image: File | null;
    }): Promise<IngredientsItem> => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return createIngredients(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ingredients"] });
      queryClient.invalidateQueries({ queryKey: ["public-ingredients"] });
    },
  });
};

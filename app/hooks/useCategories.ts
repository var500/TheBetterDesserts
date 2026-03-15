// ~/hooks/useCategories.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAll } from "~/api/cateogry";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data: { title: string; description?: string }) =>
      createCategory(data),
  });
};

export const useGetAllCateogry = () => {
  return useQuery<{ id: string; title: string; description: string }[]>({
    queryKey: ["all-category"],
    queryFn: () => getAll(),
  });
};

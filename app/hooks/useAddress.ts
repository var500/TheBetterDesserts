import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "~/api/user";
import { useAuthStore } from "~/store/authStore";

export const useAddresses = (userId?: string | null) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["addresses", userId],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return fetchAddresses(token);
    },
    enabled: !!userId && !!token,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
};

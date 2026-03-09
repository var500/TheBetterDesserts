import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "~/api/user";

export const useAddresses = (userId?: string | null) => {
  return useQuery({
    queryKey: ["addresses", userId],
    queryFn: () => fetchAddresses(userId as string),
    enabled: !!userId,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    onSuccess: (newAddress, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", variables.userId],
      });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", variables.userId],
      });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", variables.userId],
      });
    },
  });
};

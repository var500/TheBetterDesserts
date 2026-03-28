import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateProfileApi } from "~/api/user";
import type { UpdateProfilePayload } from "~/common/types";

import { useAuthStore } from "~/store/authStore";

export const useUpdateProfile = () => {
  const { user, token, updateUser } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) =>
      updateProfileApi(data, token as string),
    onSuccess: (res) => {
      updateUser({
        fname: `${res.data.fname}`.trim(),
        lname: `${res.data.lname}`.trim(),
        phone_number: res.data.phone_number,
        dob_date: res.data.dob_date,
      });
      queryClient.invalidateQueries({ queryKey: ["user", user?.uid] });
    },
  });
};

export const useGetUser = (userId?: string) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }
      return getUser(token);
    },
    enabled: !!userId,
  });
};

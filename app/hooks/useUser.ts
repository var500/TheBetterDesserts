import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "~/api/user";
import type { UpdateProfilePayload } from "~/common/types";

import { useAuthStore } from "~/store/authStore";

export const useUpdateProfile = () => {
  const { token, updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) =>
      updateProfileApi(data, token as string),
    onSuccess: (res) => {
      updateUser({
        name: `${res.data.fname} ${res.data.lname}`.trim(),
        phoneNumber: res.data.phone_number,
        dob: res.data.dob_date,
      });
    },
  });
};

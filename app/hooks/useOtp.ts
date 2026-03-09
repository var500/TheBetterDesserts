import { useMutation } from "@tanstack/react-query";

import { sendOtp, verifyOtp } from "~/api/user";
import { useAuthStore } from "~/store/authStore";
import Cookies from "js-cookie";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
    },
  });
};

export const useVerifyOtp = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
    },
  });
};

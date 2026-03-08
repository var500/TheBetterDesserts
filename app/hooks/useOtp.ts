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
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setUser(data.user);
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/";
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
    },
  });
};

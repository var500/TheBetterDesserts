import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "~/api/admin";
import { useAuthStore } from "~/store/authStore";
import Cookies from "js-cookie";

export const useAdminLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      setUser(data.user);
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/admin/dashboard";
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
    },
  });
};

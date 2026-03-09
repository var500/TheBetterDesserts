import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "~/api/admin";
import { useAuthStore } from "~/store/authStore";
import Cookies from "js-cookie";

export const useAdminLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      const adminUser = {
        uid: data.adminId,
        name: "Admin",
        role: "ADMIN",
      };
      setAuth(adminUser, data.accessToken);
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

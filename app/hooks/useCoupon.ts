import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "~/store/authStore";
import {
  createCoupon,
  getCoupons,
  toggleCoupon,
  verifyCouponApi,
} from "~/api/coupon";
import type {
  Coupon,
  CreateCouponPayload,
  VerifyCouponResponse,
} from "~/common/types";

interface VerifyCouponVariables {
  code: string;
  cartTotal: number;
  token: string;
}

export const useCoupon = (
  onSuccessCallback: (data: VerifyCouponResponse) => void,
) => {
  return useMutation({
    mutationFn: (variables: VerifyCouponVariables) =>
      verifyCouponApi(variables.code, variables.cartTotal, variables.token),
    onSuccess: (data) => {
      toast.success(`Coupon applied! You saved ₹${data.discountAmount}`);
      onSuccessCallback(data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useAdminCoupons = () => {
  const { token } = useAuthStore();

  return useQuery<Coupon[]>({
    queryKey: ["admin-coupons"],
    queryFn: () => getCoupons(token as string),
    enabled: !!token,
  });
};

export const useCreateCoupon = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    // Strictly typed payload!
    mutationFn: (data: CreateCouponPayload) =>
      createCoupon(data, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
  });
};

export const useToggleCoupon = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCoupon(id, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
  });
};

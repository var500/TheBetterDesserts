import { create } from "zustand";

export type CheckoutStep =
  | "CONTACT"
  | "OTP_VERIFICATION"
  | "DELIVERY_AND_PAYMENT";

interface CheckoutState {
  step: CheckoutStep;
  contactEmail: string;
  setStep: (step: CheckoutStep) => void;
  setContactEmail: (email: string) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: "CONTACT",
  contactEmail: "",
  setStep: (step) => set({ step }),
  setContactEmail: (contactEmail) => set({ contactEmail }),
  resetCheckout: () => set({ step: "CONTACT", contactEmail: "" }),
}));

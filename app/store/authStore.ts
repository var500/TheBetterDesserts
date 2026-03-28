import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  fname: string;
  lname: string;
  uid: string;
  email?: string;
  role?: string;
  dob_date?: string;
  phone_number?: string;
  wa_opt_in?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (userData: Partial<User>, token: string) => void;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (userData, token) =>
        set({
          user: {
            fname: userData.fname || "",
            lname: userData.lname || "",
            uid: userData.uid!,
            email: userData.email,
            role: userData.role,
            dob_date: userData.dob_date,
            phone_number: userData.phone_number,
            wa_opt_in: userData.wa_opt_in,
          },
          token: token,
        }),

      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      signOut: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

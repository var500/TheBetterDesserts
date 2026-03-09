import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  name: string;
  uid: string;
  email?: string;
  role?: string;
  dob?: string;
  phoneNumber?: string;
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
            name: userData.name || "",
            uid: userData.uid!,
            email: userData.email,
            role: userData.role,
            dob: userData.dob,
            phoneNumber: userData.phoneNumber,
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

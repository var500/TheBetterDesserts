import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  uid: string;
  email?: string;
  role?: string;
  dob?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      signOut: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

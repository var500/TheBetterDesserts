import { create } from "zustand";
import { persist } from "zustand/middleware"; // 👈 1. Import persist
import type { CartItem } from "~/common/types";

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Omit<CartItem, "quantity">, openCart?: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      clearCart: () => set({ cart: [] }),

      addToCart: (product, openCart) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          const absoluteMax = Math.min(
            product.stockAvailable ?? 0,
            product.maxPerUser ?? 5,
          );

          if (existing) {
            if (existing.quantity >= absoluteMax) {
              return state;
            }

            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
              isCartOpen: openCart,
            };
          }

          if (absoluteMax <= 0) return state;

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
            isCartOpen: openCart,
          };
        }),

      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id === id) {
              const absoluteMax = Math.min(
                item.stockAvailable ?? 0,
                item.maxPerUser ?? 5,
              );

              let newQuantity = item.quantity + delta;
              newQuantity = Math.max(1, Math.min(newQuantity, absoluteMax));

              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        })),

      removeFromCart: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "bakery-cart-storage", // 👈 3. The name of the key in localStorage
      // Optional: You can choose NOT to persist the isCartOpen state so the cart doesn't pop open automatically on page reload
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

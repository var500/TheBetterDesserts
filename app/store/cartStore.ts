import { create } from "zustand";
import { persist } from "zustand/middleware";
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
          // 1. If the item is marked as completely out of stock, reject immediately
          if (product.isAvailable === false) {
            return state;
          }

          const existing = state.cart.find((item) => item.id === product.id);
          const maxAllowed = product.maxPerUser ?? 10;

          if (existing) {
            if (existing.quantity >= maxAllowed) {
              return state; // They hit their limit
            }

            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
              isCartOpen: openCart ?? state.isCartOpen,
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
            isCartOpen: openCart ?? state.isCartOpen,
          };
        }),

      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id === id) {
              const maxAllowed = item.maxPerUser ?? 10;

              let newQuantity = item.quantity + delta;
              // Ensure they don't go below 1, and don't go above their maxPerUser
              newQuantity = Math.max(1, Math.min(newQuantity, maxAllowed));

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
      name: "bakery-cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

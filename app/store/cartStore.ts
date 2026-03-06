import { create } from "zustand";
import type { CartItem } from "~/common/types";

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Omit<CartItem, "quantity">, openCart?: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isCartOpen: false,

  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  addToCart: (product, openCart) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      // Determine the maximum they are allowed to buy
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
          isCartOpen: true,
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

          // Ensure quantity stays between 1 and the absoluteMax
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
}));

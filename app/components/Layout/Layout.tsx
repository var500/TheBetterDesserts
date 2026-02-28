import React, { useState } from "react";
import { Navbar } from "../common/Navbar";
import { SearchOverlay } from "../common/SearchOverlay";
import { CartSidebar } from "../common/SideCart";
import type { cartItem } from "../common/types";
import { AuthModal } from "../common/AuthModal";
import AutoRotatingBanner from "../common/AutoRotatingBanner";
import Footer from "../common/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<cartItem[]>([]);
  const [user, setUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const updateCart = async (newCart: cartItem[]) => {
    if (!user) {
      setCart(newCart);
      return;
    }
  };
  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const q = Math.max(1, item.quantity + delta);
        return { ...item, quantity: q };
      }
      return item;
    });
    updateCart(newCart);
  };

  const handleSignOut = async () => {
    setCart([]);
    setIsAuthOpen(false);
  };

  return (
    <>
      <AutoRotatingBanner />
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main>{children}</main>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        user={user}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default Layout;

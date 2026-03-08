import React, { useState } from "react";
import { Navbar } from "../common/Navbar";
import { SearchOverlay } from "../common/SearchOverlay";
import { CartSidebar } from "../common/SideCart";

import { AuthModal } from "../common/AuthModal";
import AutoRotatingBanner from "../common/AutoRotatingBanner";
import Footer from "../common/Footer";
import { useAuthStore } from "~/store/authStore";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, signOut } = useAuthStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSignOut = async () => {
    signOut();
    setIsAuthOpen(false);
  };

  return (
    <>
      <AutoRotatingBanner />
      <Navbar
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
      <CartSidebar />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onSignOut={handleSignOut}
        onSignIn={(userData) => {
          setUser(userData);
          setIsAuthOpen(false);
        }}
      />
    </>
  );
};

export default Layout;

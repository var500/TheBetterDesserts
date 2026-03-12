import React, { useEffect, useState } from "react";
import { Navbar } from "../common/Navbar";
import { SearchOverlay } from "../common/SearchOverlay";
import { CartSidebar } from "../common/SideCart";

import { AuthModal } from "../common/AuthModal";
import AutoRotatingBanner from "../common/AutoRotatingBanner";
import Footer from "../common/Footer";
import { useAuthStore } from "~/store/authStore";
import BirthdayModal from "../promotional/BirthdayModal";
import { useNavigate } from "react-router";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setAuth, signOut } = useAuthStore();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.dob) return;

    const hasSeenModal = localStorage.getItem("hasSeenBirthdayModal");
    if (hasSeenModal === "true") return;

    const timer = setTimeout(() => {
      setIsBirthdayModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  // Create a wrapper function to handle closing
  const handleCloseBirthdayModal = () => {
    localStorage.setItem("hasSeenBirthdayModal", "true");
    setIsBirthdayModalOpen(false);
  };
  const handleSignOut = async () => {
    signOut();
    setIsAuthOpen(false);
    navigate("/");
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

      <BirthdayModal
        isOpen={isBirthdayModalOpen}
        onClose={handleCloseBirthdayModal}
      />

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
        onSignIn={(userData, token) => {
          setAuth(userData, token);
        }}
      />
    </>
  );
};

export default Layout;

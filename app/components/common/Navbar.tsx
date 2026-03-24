import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import { Text } from "../ui/text";
import { useCartStore } from "~/store/cartStore";
import { CityPicker } from "./cityPicker";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";

// Removed cartCount from props!
interface NavbarProps {
  onOpenSearch: () => void;
  user: { name: string } | null;
  onAuthClick: () => void;
}

export const Navbar = ({ onOpenSearch, user, onAuthClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // FIX 1: Extract the state and functions correctly from Zustand
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const cart = useCartStore((state) => state.cart);

  // FIX 2: Calculate cart count globally (sum of all quantities)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle Navbar Background Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 right-0 left-0 z-40 flex h-20 items-center justify-between bg-[#F5F0E6] px-4 transition-all duration-300 md:px-8">
        {/* Left Section: Menu & Links */}
        <div className="flex flex-1 items-center gap-6">
          <Icons.Menu
            className="text-primary-dark h-6 w-6 cursor-pointer md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          />
          <div className="text-primary-dark hidden items-center gap-6 text-base font-bold tracking-wider md:flex">
            <Link to="/#home" className="transition-colors hover:text-gray-500">
              <Text as="span" variant="secondary">
                Home
              </Text>
            </Link>
            <Link
              to="/collection"
              className="transition-colors hover:text-gray-500"
            >
              <Text as="span" variant="secondary">
                Shop
              </Text>
            </Link>
            <Link
              to="/#gifting-promo"
              className="transition-colors hover:text-gray-500"
            >
              <Text as="span" variant="secondary">
                Gifting
              </Text>
            </Link>
            <Link to="/about" className="transition-colors hover:text-gray-500">
              <Text as="span" variant="secondary">
                Our Story
              </Text>
            </Link>
            <CityPicker />
          </div>
        </div>

        {/* Center Section: Logo (Fades in on scroll) */}
        <Text
          as="div"
          variant="secondary"
          className={`text-primary-dark flex flex-1 flex-col items-center text-2xl leading-[1.1] transition-opacity duration-500 ease-in-out ${
            isScrolled
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <img src="/brand/logo.png" className="max-h-8 object-contain" />
        </Text>

        {/* Right Section: Icons */}
        <div className="text-primary-dark flex flex-1 items-center justify-end gap-4">
          {user?.name === "Admin" ? (
            <Button
              variant={"rounded"}
              size={"sm"}
              className="max-w-40"
              onClick={() => navigate("/admin/dashboard")}
            >
              Go to Admin Dashboard
            </Button>
          ) : null}
          <Icons.Search
            className="h-5 w-5 cursor-pointer transition-colors hover:text-gray-500"
            onClick={onOpenSearch}
          />
          <div
            className="relative cursor-pointer transition-colors hover:text-gray-500"
            onClick={onAuthClick}
          >
            <Icons.User className={`h-5 w-5 ${user ? "text-green-600" : ""}`} />
            {user && (
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full border border-white bg-green-500"></div>
            )}
          </div>
          <div
            className="relative cursor-pointer transition-colors hover:text-gray-500"
            // FIX 3: Call the function safely inside the onClick
            onClick={() => setIsCartOpen(true)}
          >
            <Icons.ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="bg-primary-dark absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-[#F5F0E6]">
                <Text as="span" variant="primary">
                  {cartCount}
                </Text>
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* --- MOBILE SLIDE-OUT MENU --- */}
      {/* (Rest of your exact mobile menu code remains unchanged) */}

      {/* Overlay Backdrop */}
      <div
        className={`bg-primary-dark/40 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-60 flex w-[80%] max-w-sm transform flex-col bg-[#F5F0E6] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="border-primary-dark/10 flex h-20 items-center justify-between border-b px-6">
          <Text
            as="div"
            variant="secondary"
            className="text-primary-dark flex flex-col text-xl leading-tight"
          >
            <img src="/brand/logo.png" className="max-h-8 object-contain" />
          </Text>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-primary-dark -mr-2 cursor-pointer p-2 transition-colors hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-8">
          {[
            { name: "Our Story", href: "/about" },
            { name: "Home", href: "/#home" },
            { name: "Shop", href: "/collection" },
            { name: "Gifting", href: "/#gifting-promo" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-primary-dark border-primary-dark/5 border-b pb-4 text-2xl transition-colors hover:text-gray-500"
            >
              <Text as="span" variant="primary">
                {link.name}
              </Text>
            </a>
          ))}
          <CityPicker />
        </div>

        {/* Drawer Bottom Action */}
        <div className="bg-primary-dark mt-auto p-6 text-[#F5F0E6]">
          <Text as="p" variant="primary" className="mb-4 text-sm opacity-80">
            Craving something specific?
          </Text>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="hover:text-primary-dark w-full rounded-sm border border-[#F5F0E6] py-4 text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:bg-[#F5F0E6]"
          >
            <Text as="span" variant="primary">
              Search Desserts
            </Text>
          </button>
        </div>
      </div>
    </>
  );
};

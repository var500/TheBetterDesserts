import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import { Text } from "../ui/text";
import { useCartStore } from "~/store/cartStore";
import { CityPicker } from "./cityPicker";
import { Link } from "react-router";

// Removed cartCount from props!
interface NavbarProps {
  onOpenSearch: () => void;
  user: { name: string } | null;
  onAuthClick: () => void;
}

export const Navbar = ({ onOpenSearch, user, onAuthClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav className="sticky top-0 left-0 right-0 z-40 bg-[#F5F0E6] h-20 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        {/* Left Section: Menu & Links */}
        <div className="flex items-center gap-6 flex-1">
          <Icons.Menu
            className="w-6 h-6 md:hidden cursor-pointer text-primary-dark"
            onClick={() => setIsMobileMenuOpen(true)}
          />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-primary-dark">
            <Link to="/#home" className="hover:text-gray-500 transition-colors">
              <Text as="span" variant="primary">
                Home
              </Text>
            </Link>
            <Link
              to="/collection"
              className="hover:text-gray-500 transition-colors"
            >
              <Text as="span" variant="primary">
                Shop
              </Text>
            </Link>
            <Link
              to="/#gifting-promo"
              className="hover:text-gray-500 transition-colors"
            >
              <Text as="span" variant="primary">
                Gifting
              </Text>
            </Link>
            <Link to="/about" className="hover:text-gray-500 transition-colors">
              <Text as="span" variant="primary">
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
          className={`text-2xl text-primary-dark leading-[1.1] flex flex-col items-center flex-1 transition-opacity duration-500 ease-in-out ${
            isScrolled
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <img src="/brand/logo.png" className="object-contain max-h-8" />
        </Text>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-4 text-primary-dark flex-1 justify-end">
          <Icons.Search
            className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors"
            onClick={onOpenSearch}
          />
          <div
            className="relative cursor-pointer hover:text-gray-500 transition-colors"
            onClick={onAuthClick}
          >
            <Icons.User className={`w-5 h-5 ${user ? "text-green-600" : ""}`} />
            {user && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            )}
          </div>
          <div
            className="relative cursor-pointer hover:text-gray-500 transition-colors"
            // FIX 3: Call the function safely inside the onClick
            onClick={() => setIsCartOpen(true)}
          >
            <Icons.ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-[#F5F0E6] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
        className={`fixed inset-0 bg-primary-dark/40 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[#F5F0E6] z-[60] md:hidden transform transition-transform duration-300 ease-out flex flex-col shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-primary-dark/10">
          <Text
            as="div"
            variant="secondary"
            className="text-xl text-primary-dark leading-tight flex flex-col"
          >
            <img src="/brand/logo.png" className="object-contain max-h-8" />
          </Text>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-primary-dark hover:text-gray-500 transition-colors cursor-pointer"
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
        <div className="flex flex-col px-6 py-8 gap-6 overflow-y-auto">
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
              className="text-2xl text-primary-dark hover:text-gray-500 transition-colors border-b border-primary-dark/5 pb-4"
            >
              <Text as="span" variant="primary">
                {link.name}
              </Text>
            </a>
          ))}
          <CityPicker />
        </div>

        {/* Drawer Bottom Action */}
        <div className="mt-auto p-6 bg-primary-dark text-[#F5F0E6]">
          <Text as="p" variant="primary" className="text-sm opacity-80 mb-4">
            Craving something specific?
          </Text>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full py-4 border border-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-primary-dark transition-colors duration-300 uppercase tracking-widest text-xs font-bold rounded-sm"
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

import React, { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  user: { name: string } | null;
  onAuthClick: () => void;
}

export const Navbar = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  user,
  onAuthClick,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the logo after scrolling down 80px (the height of the navbar)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#F5F0E6] h-20 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      {/* Left Section: Menu & Links */}
      <div className="flex items-center gap-6 flex-1">
        <Menu className="w-6 h-6 md:hidden cursor-pointer text-[#1A243F]" />
        <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide text-[#1A243F]">
          <a href="#" className="hover:text-gray-500 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            Gifting
          </a>
        </div>
      </div>

      {/* Center Section: Logo (Fades in on scroll) */}
      <div
        className={`text-2xl font-serif text-[#1A243F] leading-[1.1] flex flex-col items-center flex-1 transition-opacity duration-500 ease-in-out ${
          isScrolled
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-baseline gap-1">
          <span className="text-sm">The</span>
          <span className="font-bold">Better</span>
        </div>
        <div className="font-bold tracking-widest">Desserts</div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-4 text-[#1A243F] flex-1 justify-end">
        <Search
          className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors"
          onClick={onOpenSearch}
        />
        <div
          className="relative cursor-pointer hover:text-gray-500 transition-colors"
          onClick={onAuthClick}
        >
          <User className={`w-5 h-5 ${user ? "text-green-600" : ""}`} />
          {user && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
          )}
        </div>
        <div
          className="relative cursor-pointer hover:text-gray-500 transition-colors"
          onClick={onOpenCart}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#1A243F] text-[#F5F0E6] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

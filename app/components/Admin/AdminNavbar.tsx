import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { Icons } from "../icons";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login");
  };

  const navLinks = [
    { name: "Orders", path: "/admin/dashboard", icon: Icons.Package },
    { name: "Products", path: "/admin/products", icon: Icons.ShoppingBag },
    { name: "Coupons", path: "/admin/coupons", icon: Icons.Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 bg-primary-dark text-white rounded-lg flex items-center justify-center font-bold font-serif">
              TBD
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Admin
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Admin Profile & Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              <Icons.LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Scrollable horizontally) */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-gray-100 space-x-2 scrollbar-hide">
        {navLinks.map((link) => {
          const isActive = location.pathname.includes(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`shrink-0 px-3 py-1.5 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

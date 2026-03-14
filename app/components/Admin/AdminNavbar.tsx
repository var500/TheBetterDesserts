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
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-primary-dark flex h-8 w-12 items-center justify-center rounded-lg font-serif font-bold text-white">
              TBD
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Admin
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Admin Profile & Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-600"
            >
              <Icons.LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Scrollable horizontally) */}
      <div className="scrollbar-hide flex space-x-2 overflow-x-auto border-t border-gray-100 px-4 py-2 md:hidden">
        {navLinks.map((link) => {
          const isActive = location.pathname.includes(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-50 text-gray-600"
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

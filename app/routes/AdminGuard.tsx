import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AdminNavbar from "~/components/Admin/AdminNavbar";

export default function ProtectedAdminRoute() {
  const { user, token } = useAuthStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isAuthorized = token && user?.role === "ADMIN";

  if (!isAuthorized) {
    toast.error("Admin access required. Please log in first.", {
      toastId: "unauthorized_admin",
    });
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

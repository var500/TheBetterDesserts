import React, { useState, useEffect, useMemo } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useAuthStore } from "~/store/authStore";
import { toast } from "react-toastify";
import OrderCard from "./OrderCard";
import { useProducts } from "~/hooks/useProducts";
import { useOrderHistory, useReorder } from "~/hooks/useOrder";
import { useGetUser, useUpdateProfile } from "~/hooks/useUser";

export default function MyAccountPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");

  const { data: currentCatalog = [], isLoading: isLoadingProducts } =
    useProducts();
  const { handleReorder } = useReorder(currentCatalog);
  const { data: orderHistory = [], isLoading: isLoadingOrders } =
    useOrderHistory();
  const { data: userData, isLoading: isLoadingUser } = useGetUser(user?.uid);
  const dbUser = userData?.user;

  // Initialize the mutation
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const profileData = useMemo(() => {
    const source = dbUser || user;
    return {
      fname: source?.fname || "",
      lname: source?.lname || "",
      phone_number: source?.phone_number || "",
      email: source?.email || "",
      dob_date: source?.dob_date || "",
      wa_opt_in: source?.wa_opt_in ?? true,
    };
  }, [dbUser, user]);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone_number: "",
    email: "",
    dob_date: "",
    wa_opt_in: true,
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        fname: profileData.fname || "",
        lname: profileData.lname || "",
        email: profileData.email || "",
        phone_number: profileData.phone_number || "",
        dob_date: profileData.dob_date || "",
        wa_opt_in: profileData.wa_opt_in ?? true,
      });
    }
  }, [profileData]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // We send formData directly. The backend handles the DOB splitting/ignoring now!
    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to update profile.");
      },
    });
  };

  if (isLoadingOrders || isLoadingProducts || isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="p" className="text-primary-dark text-xl font-bold">
          Loading your sweet details...
        </Text>
      </div>
    );
  }

  // Format the birthday for the read-only view
  const formattedBirthday = user?.dob_date
    ? new Date(user.dob_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#F5F0E6] px-4 pt-12 pb-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Text as="h1" className="text-primary-dark mb-8 text-4xl md:text-5xl">
          My Account
        </Text>

        <div className="border-primary-dark/10 mb-8 flex gap-4 border-b pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-lg font-bold transition-colors ${
              activeTab === "orders"
                ? "text-primary-dark border-primary-dark border-b-2 pb-1"
                : "text-primary-dark/50 hover:text-primary-dark"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-lg font-bold transition-colors ${
              activeTab === "profile"
                ? "text-primary-dark border-primary-dark border-b-2 pb-1"
                : "text-primary-dark/50 hover:text-primary-dark"
            }`}
          >
            Profile Details
          </button>
        </div>

        {activeTab === "orders" && (
          <div className="animate-in fade-in space-y-6">
            {orderHistory.length === 0 ? (
              <div className="border-primary-dark/5 rounded-3xl border bg-white p-8 text-center">
                <Text
                  as="h3"
                  className="text-primary-dark mb-2 text-xl font-bold"
                >
                  No orders yet
                </Text>
                <Text as="p" className="text-primary-dark/60 mb-6">
                  Looks like you haven&apos;t satisfied your sweet tooth with us
                  yet!
                </Text>
                <Button
                  variant="default"
                  className="rounded-full px-8"
                  onClick={() => (window.location.href = "/collection")}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              orderHistory.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onReorder={() => handleReorder(order.items)}
                />
              ))
            )}
          </div>
        )}

        {/* === TAB: PROFILE === */}
        {activeTab === "profile" && (
          <form
            onSubmit={handleProfileUpdate}
            className="border-primary-dark/5 animate-in fade-in space-y-6 rounded-3xl border bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-primary-dark mb-2 block text-sm font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  className="focus:border-primary-dark w-full rounded-xl border border-gray-200 p-3 outline-none"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="text-primary-dark mb-2 block text-sm font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  className="focus:border-primary-dark w-full rounded-xl border border-gray-200 p-3 outline-none"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="text-primary-dark mb-2 block text-sm font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone_number: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="focus:border-primary-dark w-full rounded-xl border border-gray-200 p-3 outline-none"
                  placeholder="9999999999"
                />
              </div>
              <div>
                <label className="text-primary-dark mb-2 block text-sm font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="focus:border-primary-dark w-full rounded-xl border border-gray-200 p-3 outline-none"
                  placeholder="jane@example.com"
                />
              </div>

              {/* === CONDITIONAL BIRTHDAY FIELD === */}
              <div>
                <label className="text-primary-dark mb-2 block text-sm font-bold">
                  Birthday
                </label>
                {!user?.dob_date ? (
                  <input
                    type="date"
                    disabled={true}
                    value={formData.dob_date}
                    onChange={(e) =>
                      setFormData({ ...formData, dob_date: e.target.value })
                    }
                    className="focus:border-primary-dark w-full rounded-xl border border-gray-200 p-3 opacity-50 outline-none"
                  />
                ) : (
                  <div className="w-full cursor-not-allowed rounded-xl border border-gray-100 bg-gray-50 p-3 text-gray-500 select-none">
                    {formattedBirthday}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="wa-opt-in"
                type="checkbox"
                checked={formData.wa_opt_in}
                onChange={(e) =>
                  setFormData({ ...formData, wa_opt_in: e.target.checked })
                }
                className="checked:bg-primary-dark checked:border-primary-dark h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-gray-300 bg-white transition-all checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox=%220%200%2016%2016%22%20fill=%22white%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
              />
              <label
                htmlFor="wa-opt-in"
                className="text-primary-dark cursor-pointer text-sm select-none"
              >
                Receive order updates and exclusive sweet deals on WhatsApp
              </label>
            </div>

            <div className="border-primary-dark/10 flex justify-end border-t pt-4">
              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-xl px-8 font-bold"
              >
                {isUpdating ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

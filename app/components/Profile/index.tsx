import React, { useState, useEffect, useMemo } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useAuthStore } from "~/store/authStore";
import { toast } from "react-toastify";
import OrderCard from "./OrderCard";
import { useProducts } from "~/hooks/useProducts";
import { useOrderHistory, useReorder } from "~/hooks/useOrder";
import { useUpdateProfile } from "~/hooks/useUser"; // <-- Import the new hook!

export default function MyAccountPage() {
  const { user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");

  const { data: currentCatalog = [], isLoading: isLoadingProducts } =
    useProducts();
  const { handleReorder } = useReorder(currentCatalog);
  const { data: orderHistory = [], isLoading: isLoadingOrders } =
    useOrderHistory(token as string);

  // Initialize the mutation
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const profileData = useMemo(
    () => ({
      fname: user?.name?.split(" ")[0] || "",
      lname: user?.name?.split(" ").slice(1).join(" ") || "",
      phone_number: user?.phoneNumber || "",
      dob_date: user?.dob || "",
      wa_opt_in: true,
    }),
    [user],
  );

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone_number: "",
    dob_date: "",
    wa_opt_in: true,
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        fname: profileData.fname || "",
        lname: profileData.lname || "",
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

  if (isLoadingOrders || isLoadingProducts) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center">
        <Text as="p" className="text-xl font-bold text-primary-dark">
          Loading your sweet details...
        </Text>
      </div>
    );
  }

  // Format the birthday for the read-only view
  const formattedBirthday = user?.dob
    ? new Date(user.dob).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Text
          as="h1"
          className="text-4xl md:text-5xl font-frista text-primary-dark mb-8"
        >
          My Account
        </Text>

        <div className="flex gap-4 mb-8 border-b border-primary-dark/10 pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-lg font-bold transition-colors ${
              activeTab === "orders"
                ? "text-primary-dark border-b-2 border-primary-dark pb-1"
                : "text-primary-dark/50 hover:text-primary-dark"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-lg font-bold transition-colors ${
              activeTab === "profile"
                ? "text-primary-dark border-b-2 border-primary-dark pb-1"
                : "text-primary-dark/50 hover:text-primary-dark"
            }`}
          >
            Profile Details
          </button>
        </div>

        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in">
            {orderHistory.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-primary-dark/5 text-center">
                <Text
                  as="h3"
                  className="text-xl font-bold text-primary-dark mb-2"
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
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">
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
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                  placeholder="9999999999"
                />
              </div>

              {/* === CONDITIONAL BIRTHDAY FIELD === */}
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">
                  Birthday
                </label>
                {!user?.dob ? (
                  <input
                    type="date"
                    value={formData.dob_date}
                    onChange={(e) =>
                      setFormData({ ...formData, dob_date: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
                  />
                ) : (
                  <div className="w-full p-3 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl select-none cursor-not-allowed">
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
                className="w-5 h-5 appearance-none rounded-sm border-2 border-gray-300 bg-white checked:bg-primary-dark checked:border-primary-dark checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox=%220%200%2016%2016%22%20fill=%22white%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat transition-all cursor-pointer"
              />
              <label
                htmlFor="wa-opt-in"
                className="text-sm text-primary-dark cursor-pointer select-none"
              >
                Receive order updates and exclusive sweet deals on WhatsApp
              </label>
            </div>

            <div className="pt-4 border-t border-primary-dark/10 flex justify-end">
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

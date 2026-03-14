import React, { useState } from "react";
import { toast } from "react-toastify";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import {
  useAdminCoupons,
  useCreateCoupon,
  useToggleCoupon,
} from "~/hooks/useCoupon"; // Adjust path to where your hooks are
import type { CreateCouponPayload } from "~/common/types";

export default function AdminCoupons() {
  // 1. Fetching & Mutations
  const { data: coupons = [], isLoading } = useAdminCoupons();
  const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon();
  const { mutate: toggleCoupon, isPending: isToggling } = useToggleCoupon();

  // 2. Local UI State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    max_discount_amount: "",
    min_order_value: "",
    usage_limit: "",
    valid_until: "",
  });

  // 3. Handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up data to match the strongly typed CreateCouponPayload
    const payload: CreateCouponPayload = {
      code: formData.code.trim().toUpperCase(),
      discount_percentage: Number(formData.discount_percentage),
      max_discount_amount: formData.max_discount_amount
        ? Number(formData.max_discount_amount)
        : null,
      min_order_value: formData.min_order_value
        ? Number(formData.min_order_value)
        : null,
      usage_limit: formData.usage_limit ? Number(formData.usage_limit) : null,
      valid_until: formData.valid_until
        ? new Date(formData.valid_until).toISOString()
        : null,
    };

    createCoupon(payload, {
      onSuccess: () => {
        toast.success("Coupon created successfully!");
        setShowForm(false);
        // Reset form
        setFormData({
          code: "",
          discount_percentage: "",
          max_discount_amount: "",
          min_order_value: "",
          usage_limit: "",
          valid_until: "",
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create coupon.");
      },
    });
  };

  const handleToggle = (id: string, currentStatus: boolean) => {
    toggleCoupon(id, {
      onSuccess: () => {
        toast.success(`Coupon ${currentStatus ? "deactivated" : "activated"}!`);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to toggle status.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Text as="p" className="text-xl font-bold text-gray-500">
          Loading coupons...
        </Text>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Coupons
          </h1>
          <p className="mt-1 text-gray-500">
            Create and toggle promotional codes for your customers.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className={`rounded-lg px-6 py-2 font-bold transition-colors ${
            showForm
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {showForm ? "Cancel" : "+ New Coupon"}
        </Button>
      </div>

      {/* Expandable Form Section */}
      {showForm && (
        <form
          onSubmit={handleCreateSubmit}
          className="animate-in fade-in slide-in-from-top-4 grid grid-cols-1 gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-3 md:p-8"
        >
          <div className="col-span-1 border-b border-gray-100 pb-2 md:col-span-3">
            <h2 className="text-lg font-bold text-gray-900">
              Create a New Offer
            </h2>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Coupon Code *
            </label>
            <input
              required
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              placeholder="e.g. SUMMER20"
              className="w-full rounded-xl border border-gray-300 p-2.5 uppercase outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Discount % *
            </label>
            <input
              required
              type="number"
              min="1"
              max="100"
              value={formData.discount_percentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount_percentage: e.target.value,
                })
              }
              placeholder="20"
              className="w-full rounded-xl border border-gray-300 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Max Discount Amount (₹)
            </label>
            <input
              type="number"
              value={formData.max_discount_amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  max_discount_amount: e.target.value,
                })
              }
              placeholder="e.g. 500 (Optional)"
              className="w-full rounded-xl border border-gray-300 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Min Order Value (₹)
            </label>
            <input
              type="number"
              value={formData.min_order_value}
              onChange={(e) =>
                setFormData({ ...formData, min_order_value: e.target.value })
              }
              placeholder="e.g. 1000 (Optional)"
              className="w-full rounded-xl border border-gray-300 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Total Usage Limit
            </label>
            <input
              type="number"
              value={formData.usage_limit}
              onChange={(e) =>
                setFormData({ ...formData, usage_limit: e.target.value })
              }
              placeholder="e.g. 100 uses (Optional)"
              className="w-full rounded-xl border border-gray-300 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Valid Until
            </label>
            <input
              type="date"
              value={formData.valid_until}
              onChange={(e) =>
                setFormData({ ...formData, valid_until: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div className="col-span-1 mt-2 flex justify-end border-t border-gray-100 pt-4 md:col-span-3">
            <Button
              type="submit"
              disabled={isCreating}
              className="rounded-xl bg-gray-900 px-8 py-2.5 font-bold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isCreating ? "Generating..." : "Save Coupon"}
            </Button>
          </div>
        </form>
      )}

      {/* Data Table Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-gray-100 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-bold">Code</th>
                <th className="px-6 py-4 font-bold">Offer Details</th>
                <th className="px-6 py-4 font-bold">Usage</th>
                <th className="px-6 py-4 font-bold">Expires</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No coupons found. Click &quot;+ New Coupon&quot; to create
                    one.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className={`transition-colors hover:bg-gray-50/50 ${!coupon.is_active ? "bg-gray-50 opacity-60" : ""}`}
                  >
                    <td className="px-6 py-4 font-black tracking-widest text-gray-900">
                      {coupon.code}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-700">
                        {coupon.discount_percentage}% OFF
                      </div>
                      <div className="mt-0.5 flex gap-2 text-xs text-gray-500">
                        {coupon.max_discount_amount && (
                          <span>Up to ₹{coupon.max_discount_amount}</span>
                        )}
                        {coupon.min_order_value && (
                          <span>Min cart: ₹{coupon.min_order_value}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {coupon.usage_count}{" "}
                      <span className="text-gray-400">
                        / {coupon.usage_limit || "∞"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {coupon.valid_until
                        ? new Date(coupon.valid_until).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : "Never"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          coupon.is_active
                            ? "border border-green-200 bg-green-100 text-green-800"
                            : "border border-gray-200 bg-gray-100 text-gray-600"
                        }`}
                      >
                        {coupon.is_active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          handleToggle(coupon.id, coupon.is_active)
                        }
                        disabled={isToggling}
                        className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                          coupon.is_active
                            ? "text-red-600 hover:bg-red-50"
                            : "text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {coupon.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

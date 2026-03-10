import React, { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "~/common/types";
import { useAdminOrders, useUpdateOrderStatus } from "~/hooks/useOrder";
import { useAuthStore } from "~/store/authStore";
import { useNavigate } from "react-router"; // <-- 1. Import useNavigate

const ITEMS_PER_PAGE = 5;

// --- Date Helper Functions ---
const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

const DATE_OPTIONS = [
  { label: "All Dates", value: "ALL" },
  { label: "Today", value: getFormattedDate(today) },
  { label: "Tomorrow", value: getFormattedDate(tomorrow) },
  { label: "Day After", value: getFormattedDate(dayAfter) },
];

export default function AdminDashboard() {
  const { token } = useAuthStore();
  const navigate = useNavigate(); // <-- 2. Initialize navigate

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: response, isLoading } = useAdminOrders(
    currentPage,
    ITEMS_PER_PAGE,
    statusFilter,
    token,
    debouncedSearchTerm,
    dateFilter,
  );

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus(token);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateStatus({ id: orderId, status: newStatus });
  };

  const orders = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.totalPages || 1;

  // --- Display Helper for Delivery Time ---
  const formatDeliveryTime = (
    dateStr: string,
    startStr: string,
    endStr: string,
  ) => {
    try {
      const date = new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      return `${date}, ${formatTime(startStr)} - ${formatTime(endStr)}`;
    } catch {
      return "TBD";
    }
  };

  return (
    <div className="max-w-7xl px-4 md:px-10 pt-4 mx-auto space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-center md:text-left font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1 text-center md:text-left">
          Manage and track customer orders.
        </p>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search ID, Name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-1.5 outline-none w-full sm:w-64"
            />

            {/* DATE FILTER */}
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-gray-300 rounded-md text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-1.5 border outline-none cursor-pointer w-full sm:w-auto"
            >
              {DATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-gray-300 rounded-md text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-1.5 border outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="ALL">All Statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-75">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">AWB</th>
                <th className="px-6 py-4 font-medium">Expected Delivery</th>
                <th className="px-6 py-4 font-medium">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="animate-pulse flex flex-col items-center justify-center">
                      <div className="h-6 w-6 border-b-2 border-blue-600 rounded-full animate-spin mb-2"></div>
                      Loading orders...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500 w-full"
                  >
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className=" hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {order.user?.fname} {order.user?.lname}
                      <div className="text-xs text-gray-500 mt-1">
                        {order.user?.phone_number}
                      </div>
                    </td>
                    <td className="px-6 py-4">₹{order.total_amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.payment_status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : order.payment_status === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {order.awb_number || "N/A"}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatDeliveryTime(
                        order.delivery_date,
                        order.slot_start_time,
                        order.slot_end_time,
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()} // <-- 4. Stop click from bubbling up to the row
                        disabled={isUpdating}
                        className={`text-xs font-bold rounded-md px-2 py-1.5 border outline-none cursor-pointer transition-colors ${
                          order.order_status === "CANCELLED"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : order.order_status === "DELIVERED"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : order.order_status === "BAKING"
                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-sm text-gray-500">
              Page{" "}
              <span className="font-medium text-gray-900">{currentPage}</span>{" "}
              of <span className="font-medium text-gray-900">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

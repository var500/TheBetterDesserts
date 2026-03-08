import React, { useState, useMemo } from "react";

// --- Mock Data Setup ---
const INITIAL_ORDERS = [
  {
    id: "ORD-1001",
    user: "Alice Smith",
    total: 45.5,
    payment_status: "PAID",
    awb_number: "AWB987654321",
    delivery_date: "2026-03-08",
    status: "PENDING",
  },
  {
    id: "ORD-1002",
    user: "Bob Jones",
    total: 12.0,
    payment_status: "PENDING",
    awb_number: "N/A",
    delivery_date: "2026-03-08",
    status: "CONFIRMED",
  },
  {
    id: "ORD-1003",
    user: "Charlie Brown",
    total: 89.99,
    payment_status: "PAID",
    awb_number: "AWB112233445",
    delivery_date: "2026-03-07",
    status: "BAKING",
  },
  {
    id: "ORD-1004",
    user: "Diana Prince",
    total: 34.0,
    payment_status: "PAID",
    awb_number: "AWB998877665",
    delivery_date: "2026-03-07",
    status: "OUT_FOR_DELIVERY",
  },
  {
    id: "ORD-1005",
    user: "Evan Wright",
    total: 22.5,
    payment_status: "PAID",
    awb_number: "AWB554433221",
    delivery_date: "2026-03-06",
    status: "DELIVERED",
  },
  {
    id: "ORD-1006",
    user: "Fiona Gallagher",
    total: 15.0,
    payment_status: "FAILED",
    awb_number: "N/A",
    delivery_date: "2026-03-09",
    status: "PENDING",
  },
  {
    id: "ORD-1007",
    user: "George Costanza",
    total: 55.2,
    payment_status: "PAID",
    awb_number: "AWB333222111",
    delivery_date: "2026-03-08",
    status: "BAKING",
  },
];

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "BAKING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  BAKING: "BAKING",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
} as const;

const ITEMS_PER_PAGE = 5;

export default function AdminDashboard() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  type OrderStatusType = keyof typeof OrderStatus;

  const handleStatusChange = (orderId: string, newStatus: OrderStatusType) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === "ALL") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back. Here is what is happening today.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Revenue", value: "$2,450.00", trend: "+12%" },
            { label: "Orders Today", value: "45", trend: "+5%" },
            {
              label: "Currently Baking",
              value: orders
                .filter((o) => o.status === "BAKING")
                .length.toString(),
              trend: "Active",
            },
            {
              label: "Pending Action",
              value: orders
                .filter((o) => o.status === "PENDING")
                .length.toString(),
              trend: "Requires attention",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold">{stat.value}</span>
                <span className="text-sm text-blue-600 font-medium">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header & Filters */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <div className="flex items-center gap-3">
              <label
                htmlFor="status-filter"
                className="text-sm font-medium text-gray-600"
              >
                Filter Status:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={handleFilterChange}
                className="border-gray-300 rounded-md text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-1.5 border outline-none"
              >
                <option value="ALL">All Orders</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Total Cost</th>
                  <th className="px-6 py-4 font-medium">Payment</th>
                  <th className="px-6 py-4 font-medium">AWB Number</th>
                  <th className="px-6 py-4 font-medium">Delivery Date</th>
                  <th className="px-6 py-4 font-medium">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No orders found matching this filter.
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-blue-600">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">{order.user}</td>
                      <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            order.payment_status === "PAID"
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
                        {order.awb_number}
                      </td>
                      <td className="px-6 py-4">{order.delivery_date}</td>
                      <td className="px-6 py-4">
                        {/* Inline Status Updater */}
                        <select
                          value={order.status as OrderStatusType}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderStatusType,
                            )
                          }
                          className={`text-xs font-bold rounded-md px-2 py-1.5 border outline-none cursor-pointer transition-colors ${
                            order.status === "DELIVERED"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : order.status === "BAKING"
                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                : order.status === "OUT_FOR_DELIVERY"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
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
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}{" "}
                of {filteredOrders.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

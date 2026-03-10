import React from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { Icons } from "../icons";
import { Button } from "../ui/button";

// Import your actual hooks from useOrder.ts
import { useOrderDetails, useUpdateOrderStatus } from "~/hooks/useOrder";

export default function Details() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  // 1. Fetch order details using your existing hook
  const { data: order, isLoading } = useOrderDetails(
    orderId,
    token ?? undefined,
  );

  // 2. Bring in the mutation to update the status
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus(token);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500 gap-4">
        <p>Order not found.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const formatCurrency = (amount: string | number) =>
    `₹${Number(amount).toFixed(2)}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handler for when the admin selects a new status from the dropdown
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (orderId && newStatus !== order.order_status) {
      updateStatus({ id: orderId, status: newStatus });
    }
  };

  return (
    <div className="max-w-7xl pt-4 mx-auto space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2 transition"
          >
            <Icons.ArrowLeft className="w-4 h-4" /> Back to Orders
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            Order #{order.id.slice(0, 8).toUpperCase()}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wide ${
                order.order_status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.order_status === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.order_status}
            </span>
          </h1>
          <p className="text-gray-500 mt-1">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>

        {/* Functional Status Dropdown */}
        <div className="flex gap-2 items-center">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Update Status:
          </label>
          <select
            id="status"
            value={order.order_status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 disabled:opacity-50"
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* --- TOP CARDS: CUSTOMER & ORDER INFO --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
            Customer Details
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong className="text-gray-900">Name:</strong>{" "}
              {order.user?.fname} {order.user?.lname}
            </p>
            <p>
              <strong className="text-gray-900">Email:</strong>{" "}
              {order.user?.email}
            </p>
            <p>
              <strong className="text-gray-900">Phone:</strong> +91{" "}
              {order.user?.phone_number}
            </p>
            <p>
              <strong className="text-gray-900">WhatsApp Opt-in:</strong>
              <span
                className={
                  order.user?.wa_opt_in
                    ? "text-green-600 ml-1"
                    : "text-red-600 ml-1"
                }
              >
                {order.user?.wa_opt_in ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
            Delivery & Payment
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong className="text-gray-900">Payment Status:</strong>
              <span
                className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                  order.payment_status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.payment_status}
              </span>
            </p>
            <p>
              <strong className="text-gray-900">Razorpay ID:</strong>{" "}
              {order.razorpayOrderId || "N/A"}
            </p>
            <p>
              <strong className="text-gray-900">Delivery Date:</strong>{" "}
              {new Date(order.delivery_date).toLocaleDateString("en-IN")}
            </p>
            <p>
              <strong className="text-gray-900">Time Slot:</strong>{" "}
              {new Date(order.slot_start_time).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(order.slot_end_time).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* --- ITEMS TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Item</th>
                <th className="px-6 py-4 font-medium text-center">Quantity</th>
                <th className="px-6 py-4 font-medium text-right">Unit Price</th>
                <th className="px-6 py-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.product.name}
                  </td>
                  <td className="px-6 py-4 text-center">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">
                    {formatCurrency(item.product.price)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </td>
                </tr>
              ))}
              {(!order.items || order.items.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No items found for this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PRICING SUMMARY --- */}
      <div className="flex justify-end">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full sm:w-96">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
            Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items Subtotal</span>
              <span>{formatCurrency(order.total_items_cost)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>{formatCurrency(order.delivery_fee)}</span>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
              <span>Grand Total</span>
              <span>{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

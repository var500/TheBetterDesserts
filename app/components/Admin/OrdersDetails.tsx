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
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-gray-500">
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
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-4 pb-10 sm:px-6 lg:px-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <Icons.ArrowLeft className="h-4 w-4" /> Back to Orders
          </button>
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-gray-900">
            Order #{order.id.slice(0, 8).toUpperCase()}
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${
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
          <p className="mt-1 text-gray-500">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>

        {/* Functional Status Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Update Status:
          </label>
          <select
            id="status"
            value={order.order_status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="block rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
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
                    ? "ml-1 text-green-600"
                    : "ml-1 text-red-600"
                }
              >
                {order.user?.wa_opt_in ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
            Delivery & Payment
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong className="text-gray-900">Payment Status:</strong>
              <span
                className={`ml-2 rounded px-2 py-0.5 text-xs font-medium ${
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
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-gray-100 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-medium">Item</th>
                <th className="px-6 py-4 text-center font-medium">Quantity</th>
                <th className="px-6 py-4 text-right font-medium">Unit Price</th>
                <th className="px-6 py-4 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items?.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50/50"
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
        <div className="w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:w-96">
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-900">
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
            <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
              <span>Grand Total</span>
              <span>{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

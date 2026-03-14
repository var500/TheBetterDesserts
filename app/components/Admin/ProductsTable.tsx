import React, { useState } from "react";
import { useAuthStore } from "~/store/authStore";

import ProductFormModal from "./ProductFormModal";

import type { AdminProduct } from "~/common/types";
import { useAdminProducts, useProductMutations } from "~/hooks/useProducts";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { toast } from "react-toastify";

export default function ProductsTable() {
  const { token } = useAuthStore();
  const {
    data: products = [],
    isLoading,
    refetch,
    isFetching,
  } = useAdminProducts(token);
  const { remove, update } = useProductMutations(token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );

  const categories = Array.from(
    new Map(
      products.map((p: AdminProduct) => [p.category.id, p.category]),
    ).values(),
  ) as { id: string; title: string }[];

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-800">
            Are you sure you want to deactivate this product? It will be removed
            from the store but preserved in order history.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                remove.mutate(id);
                closeToast(); // Dismiss the toast after confirming
              }}
              className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
            >
              Yes, Deactivate
            </button>
          </div>
        </div>
      ),
      {
        // Settings to make it behave like a modal
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        position: "top-center", // Shows up right in the middle top
        toastId: `delete-confirm-${id}`, // Prevents duplicate toasts if they spam the delete button
      },
    );
  };

  const toggleActiveStatus = (id: string, currentStatus: boolean) => {
    update.mutate({ id, data: { is_active: !currentStatus } });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-4 pb-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Products Catalog
          </h1>
          <p className="mt-1 text-gray-500">
            Manage your bakery items, pricing, and inventory.
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button
            variant={"outline"}
            className="flex flex-row gap-2 rounded-lg px-2"
            onClick={() => refetch()}
          >
            <Icons.Refresh className="h-4 w-4" />
            <Text as={"span"} className="capitalize">
              Refresh
            </Text>
          </Button>
          <Button
            variant={"outline"}
            onClick={handleAddNew}
            className="rounded-md border-none bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            + Add Product
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="min-h-75 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-gray-100 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-medium">Product Info</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Total Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={6} className="py-36 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found. Click &quot;Add Product&quot; to create
                    one.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  // Temp using 'any' to bypass strict TS check while we fix the read logic

                  // 1. FIX THE STOCK CALCULATION: Read from the backend's 'stockAvailable'
                  const totalStock = product.stockAvailable || 0;

                  // 2. FIX THE IMAGE URL: Safely fall back through the possible keys
                  const primaryImage = product.image?.[0] || "/placeholder.png";

                  return (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={primaryImage} // <-- Use the safely resolved image here
                            alt={product.name}
                            className="h-10 w-10 rounded-md border border-gray-200 object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            {product.is_bestseller && (
                              <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-yellow-800">
                                BESTSELLER
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {product.category?.title || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ₹{Number(product.base_price).toFixed(2)}{" "}
                        {/* Safe fallback for price too */}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-medium ${totalStock > 10 ? "text-green-600" : totalStock > 0 ? "text-orange-600" : "text-red-600"}`}
                        >
                          {totalStock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          // Note: Ensure your backend actually returns is_active, I don't see it in your JSON snippet!
                          // If it's missing from the backend response, this toggle might behave weirdly.
                          onClick={() =>
                            toggleActiveStatus(product.id, product.is_active)
                          }
                          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                            product.is_active !== false // Default to active if undefined
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {product.is_active !== false ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(product)}
                          className="mr-4 cursor-pointer font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="cursor-pointer font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={token!}
        initialData={editingProduct}
        categories={categories}
      />
    </div>
  );
}

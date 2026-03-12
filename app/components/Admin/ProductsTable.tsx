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
          <div className="flex gap-2 justify-end">
            <button
              onClick={closeToast}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                remove.mutate(id);
                closeToast(); // Dismiss the toast after confirming
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
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
    <div className="max-w-7xl pt-4 mx-auto space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Products Catalog
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your bakery items, pricing, and inventory.
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Button
            variant={"outline"}
            className="flex flex-row gap-2 px-2 rounded-lg"
            onClick={() => refetch()}
          >
            <Icons.Refresh className="h-4 w-4" />
            <Text as={"span"} className="capitalize">
              Refresh
            </Text>
          </Button>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto min-h-75">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Product Info</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Total Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={6} className=" py-36 text-center text-gray-500">
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                products.map((product) => {
                  // Temp using 'any' to bypass strict TS check while we fix the read logic

                  // 1. FIX THE STOCK CALCULATION: Read from the backend's 'stockAvailable'
                  const totalStock = product.stockAvailable || 0;

                  // 2. FIX THE IMAGE URL: Safely fall back through the possible keys
                  const primaryImage = product.image?.[0] || "/placeholder.png";

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={primaryImage} // <-- Use the safely resolved image here
                            alt={product.name}
                            className="w-10 h-10 rounded-md object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            {product.is_bestseller && (
                              <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-bold tracking-wide">
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
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
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
                          className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
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

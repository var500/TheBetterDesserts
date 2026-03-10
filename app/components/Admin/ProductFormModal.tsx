import React, { useState, useEffect } from "react";
import type { AdminProduct, CreateProductPayload } from "~/common/types";
import { useProductMutations } from "~/hooks/useProducts";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  initialData?: AdminProduct | null;
  categories: { id: string; title: string }[]; // Pass categories for the dropdown
}

const DEFAULT_FORM_STATE: CreateProductPayload = {
  name: "",
  description: "",
  price: 0,
  image_url: [""],
  category: "",
  weight_grams: 0,
  unitDescription: "",
  is_active: true,
  is_bestseller: false,
  max_per_user: 5,
  availability: [
    { zone: "GURGAON", stock_count: 0 },
    { zone: "DELHI_NCR", stock_count: 0 },
    { zone: "PAN_INDIA", stock_count: 0 },
  ],
};

export default function ProductFormModal({
  isOpen,
  onClose,
  token,
  initialData,
  categories,
}: ProductFormModalProps) {
  const [formData, setFormData] =
    useState<CreateProductPayload>(DEFAULT_FORM_STATE);
  const { create, update } = useProductMutations(token);

  // Populate form if editing
  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      const images = initialData.image || [];

      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: Number(initialData.price || 0),
        image_url: images.length > 0 ? images : [""],

        category: initialData.category?.id || "",
        weight_grams: initialData.weight_grams || 0,
        unitDescription: initialData.unitDescription || "",
        is_active: initialData.is_active !== false,
        is_bestseller: !!initialData.is_bestseller,
        max_per_user: initialData.max_per_user || 5,
        availability: ["GURGAON", "DELHI_NCR", "PAN_INDIA"].map((zone) => {
          const existing = (initialData.availability || []).find(
            (a) => a.zone === zone,
          );
          return {
            zone: zone as "GURGAON" | "DELHI_NCR" | "PAN_INDIA",
            stock_count: existing?.stock_count || 0,
          };
        }),
      });
    } else {
      setFormData(DEFAULT_FORM_STATE);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty image URLs
    const cleanedData = {
      ...formData,
      image_url: formData.image_url.filter((url) => url.trim() !== ""),
    };

    if (initialData) {
      update.mutate(
        { id: initialData.id, data: cleanedData },
        { onSuccess: onClose },
      );
    } else {
      create.mutate(cleanedData, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  const isPending = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price (₹) *
              </label>
              <input
                required
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none bg-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Image URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.image_url[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: [e.target.value] })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Inventory & Zones */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              Zone Stock Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.availability.map((avail, index) => (
                <div
                  key={avail.zone}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {avail.zone.replace("_", " ")}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={avail.stock_count}
                    onChange={(e) => {
                      const newAvail = [...formData.availability];
                      newAvail[index].stock_count = Number(e.target.value);
                      setFormData({ ...formData, availability: newAvail });
                    }}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-1.5 text-sm border outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_bestseller}
                onChange={(e) =>
                  setFormData({ ...formData, is_bestseller: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">
                Bestseller
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

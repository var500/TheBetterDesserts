import React, { useState, useEffect } from "react";
import type { AdminProduct, CreateProductPayload } from "~/common/types";
import { useProductMutations } from "~/hooks/useProducts";
import ImageDropzone from "../common/ImageDropzone";
import { Button } from "../ui/button";
import FAQInputManager from "../common/FAQInputManager";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  initialData?: AdminProduct | null;
  categories: { id: string; title: string }[]; // Pass categories for the dropdown
}

const DEFAULT_FORM_STATE: CreateProductPayload = {
  name: "",
  base_price: 0,
  image_url: [""],
  category: "",
  weight_grams: 0,
  unitDescription: "",
  description: "",
  faq: [],
  is_active: true,
  is_bestseller: false,
  isNewLaunch: true,
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

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        image_url: initialData.image || "",
        faq: initialData.faq || [],
        base_price: Number(initialData.base_price || 0),
        category: initialData.category?.id || "",
        weight_grams: initialData.weight_grams || 0,
        unitDescription: initialData.unitDescription || "",
        description: initialData.description || "",
        is_active: initialData.is_active !== false,
        isNewLaunch: !!initialData.isNewLaunch,
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

      // Populate existing images
      setExistingImages(initialData.image || []);
    } else {
      setFormData(DEFAULT_FORM_STATE);
      setExistingImages([]);
    }

    // Reset states on open/close
    setNewImages([]);
    setImagesToDelete([]);
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      image_url: existingImages,
      images: newImages,
      imagesToDelete: imagesToDelete,
    };

    if (initialData) {
      update.mutate(
        { id: initialData.id, data: payload },
        { onSuccess: onClose },
      );
    } else {
      create.mutate(payload, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  const isPending = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-6">
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

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Base Price (₹) *
              </label>
              <input
                required
                type="number"
                min="0"
                value={formData.base_price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    base_price: Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Unit Description
              </label>
              <textarea
                rows={1}
                value={formData.unitDescription || ""}
                onChange={(e) =>
                  setFormData({ ...formData, unitDescription: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
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
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <FAQInputManager
            faqs={formData.faq || []}
            onChange={(newFaqs) => setFormData({ ...formData, faq: newFaqs })}
          />

          <hr className="border-gray-100" />

          <ImageDropzone
            existingImages={existingImages}
            newImages={newImages}
            onAddFiles={(files) => setNewImages((prev) => [...prev, ...files])}
            onRemoveNew={(index) =>
              setNewImages((prev) => prev.filter((_, i) => i !== index))
            }
            onRemoveExisting={(url) => {
              setExistingImages((prev) => prev.filter((img) => img !== url));
              setImagesToDelete((prev) => [...prev, url]);
            }}
          />

          <hr className="border-gray-100" />

          {/* Inventory & Zones */}
          <div>
            <h3 className="mb-3 text-lg font-medium">
              Zone Stock Availability
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {formData.availability.map((avail, index) => (
                <div
                  key={avail.zone}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                >
                  <label className="mb-1 block text-xs font-semibold text-gray-500">
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
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNewLaunch}
                onChange={(e) =>
                  setFormData({ ...formData, isNewLaunch: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                New Launch
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_bestseller}
                onChange={(e) =>
                  setFormData({ ...formData, is_bestseller: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Bestseller
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white pt-4">
            <Button
              type="button"
              variant={"default"}
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              type="submit"
              disabled={isPending}
              className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useRef } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "~/lib/utils";
import { toast } from "react-toastify";

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

interface IngredientSelectorProps {
  availableIngredients: Ingredient[];
  selectedIngredientIds: string[];
  onChange: (newSelectedIds: string[]) => void;
  onCreateNew: (
    name: string,
    description: string,
    image: File | null,
  ) => Promise<string | undefined>;
}

export default function IngredientSelector({
  availableIngredients,
  selectedIngredientIds,
  onChange,
  onCreateNew,
}: IngredientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for creating a new ingredient
  const [isCreating, setIsCreating] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CROPPER STATE ---
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleSelect = (id: string) => {
    if (!selectedIngredientIds.includes(id)) {
      onChange([...selectedIngredientIds, id]);
    }
    setSearchTerm("");
  };

  const handleRemove = (idToRemove: string) => {
    onChange(selectedIngredientIds.filter((id) => id !== idToRemove));
  };

  const resetForm = () => {
    setIsCreating(false);
    setSearchTerm("");
    setNewDesc("");
    setImageFile(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
  };

  const handleCreateSubmit = async () => {
    if (!searchTerm || !newDesc) return;
    setIsSubmitting(true);

    const newId = await onCreateNew(searchTerm, newDesc, imageFile);

    if (newId) {
      onChange([...selectedIngredientIds, newId]);
      resetForm();
    }
    setIsSubmitting(false);
  };

  // --- CROPPER LOGIC ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCropFileName(file.name);
      setCropImageSrc(URL.createObjectURL(file));
    }
    // Clear input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const saveCroppedImage = async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;
    setIsCropping(true);

    try {
      const croppedFile = await getCroppedImg(
        cropImageSrc,
        croppedAreaPixels,
        cropFileName,
      );

      if (croppedFile) {
        setImageFile(croppedFile);
        // Create a preview URL for the cropped image to show in the form
        if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(URL.createObjectURL(croppedFile));
      }

      cancelCropping();
    } catch (e) {
      toast.error("Failed to crop image.");
      console.error((e as Error).message);
    } finally {
      setIsCropping(false);
    }
  };

  const cancelCropping = () => {
    if (cropImageSrc) URL.revokeObjectURL(cropImageSrc);
    setCropImageSrc(null);
    setCropFileName("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // --- FILTERING ---
  const filteredAvailable = availableIngredients.filter(
    (ing) =>
      !selectedIngredientIds.includes(ing.id) &&
      ing.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedIngredients = availableIngredients.filter((ing) =>
    selectedIngredientIds.includes(ing.id),
  );

  const exactMatchExists = availableIngredients.some(
    (ing) => ing.name.toLowerCase() === searchTerm.toLowerCase(),
  );

  return (
    <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
      <label className="block text-sm font-medium text-gray-700">
        Recipe Ingredients
      </label>

      {/* Selected Ingredients Tags */}
      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {selectedIngredients.map((ing) => (
            <span
              key={ing.id}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {ing.name}
              <button
                type="button"
                onClick={() => handleRemove(ing.id)}
                className="ml-1 text-blue-600 hover:text-blue-900"
              >
                <Icons.X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* INLINE CREATION FORM */}
      {isCreating ? (
        <div className="space-y-3 rounded-md border border-blue-200 bg-blue-50/50 p-4">
          <h4 className="text-sm font-semibold text-blue-900">
            Add New Ingredient
          </h4>
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Description *</label>
            <textarea
              rows={2}
              required
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="E.g., Crunchy and nutrient-rich..."
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload / Preview Area */}
          <div>
            <label className="text-xs text-gray-600">
              Ingredient Image (1:1 Ratio)
            </label>
            {imagePreviewUrl ? (
              <div className="mt-1 flex items-start gap-4">
                <img
                  src={imagePreviewUrl}
                  alt="Cropped Preview"
                  className="h-16 w-16 rounded-md border border-gray-300 object-cover shadow-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImageFile(null);
                    URL.revokeObjectURL(imagePreviewUrl);
                    setImagePreviewUrl(null);
                  }}
                  className="text-red-500"
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-1.5 text-sm"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting || !searchTerm || !newDesc}
              onClick={handleCreateSubmit}
            >
              {isSubmitting ? "Saving..." : "Save & Add"}
            </Button>
          </div>
        </div>
      ) : (
        /* STANDARD SEARCH INPUT */
        <div className="relative">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
          />

          {searchTerm && (
            <ul className="ring-opacity-5 absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
              {filteredAvailable.map((ing) => (
                <li
                  key={ing.id}
                  onClick={() => handleSelect(ing.id)}
                  className="relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-blue-50"
                >
                  <span className="block truncate font-normal">{ing.name}</span>
                </li>
              ))}

              {!exactMatchExists && (
                <li
                  onClick={() => setIsCreating(true)}
                  className="relative cursor-pointer border-t border-gray-100 bg-gray-50 py-2 pr-9 pl-3 font-medium text-blue-600 select-none hover:bg-blue-100"
                >
                  <span className="block truncate">
                    + Create &quot;{searchTerm}&quot;
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* Cropping Modal Overlay */}
      {cropImageSrc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-800">
                Crop Ingredient Image
              </h3>
              <button
                onClick={cancelCropping}
                className="font-bold text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <div className="relative h-[300px] w-full bg-gray-100 sm:h-[400px]">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // 1:1 Aspect ratio locked
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t bg-white p-4">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-1/2 accent-blue-600"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  size={"sm"}
                  className="max-w-24 rounded-md border-none bg-red-500 text-white"
                  onClick={cancelCropping}
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveCroppedImage}
                  disabled={isCropping}
                  size={"sm"}
                  className="rounded-md border-none bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isCropping ? "Saving..." : "Apply Crop"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

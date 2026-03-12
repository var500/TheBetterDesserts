import React, { useCallback, useRef } from "react";
import { Button } from "../ui/button";

interface ImageDropzoneProps {
  existingImages: string[];
  newImages: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveExisting: (url: string) => void;
  onRemoveNew: (index: number) => void;
}

export default function ImageDropzone({
  existingImages,
  newImages,
  onAddFiles,
  onRemoveExisting,
  onRemoveNew,
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      if (droppedFiles.length > 0) onAddFiles(droppedFiles);
    },
    [onAddFiles],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 0) onAddFiles(selectedFiles);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Images
      </label>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="text-gray-500">
          <p className="font-medium">Click to upload or drag and drop</p>
          <p className="text-xs mt-1">PNG, JPG, WEBP up to 5MB</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      {(existingImages.length > 0 || newImages.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {/* Existing Images from DB */}
          {existingImages.map((url) => (
            <div
              key={url}
              className="relative group rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={url}
                alt="Existing"
                className="w-full h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveExisting(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}

          {/* New Files to Upload */}
          {newImages.map((file, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border border-blue-200 shadow-[0_0_0_2px_rgba(59,130,246,0.5)]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="New upload"
                className="w-full h-24 object-cover opacity-80"
              />
              <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                NEW
              </span>
              <Button
                variant={"rounded"}
                size={"sm"}
                type="button"
                onClick={() => onRemoveNew(index)}
                className="absolute  top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "~/lib/utils";

interface ImageDropzoneProps {
  existingImages: string[];
  newImages: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveExisting: (url: string) => void;
  onRemoveNew: (index: number) => void;
  maxImages?: number;
}

interface QueuedFile {
  file: File;
  previewUrl: string;
}

export default function ImageDropzone({
  existingImages,
  newImages,
  onAddFiles,
  onRemoveExisting,
  onRemoveNew,
  maxImages = 3,
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropper State
  const [cropQueue, setCropQueue] = useState<QueuedFile[]>([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  // 1. Intercept files and add them to the Crop Queue
  const queueFilesForCropping = (files: File[]) => {
    const totalCurrent = existingImages.length + newImages.length;
    const availableSlots = maxImages - totalCurrent;

    if (availableSlots <= 0) {
      toast.error(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);
    if (files.length > availableSlots) {
      toast.warning(
        `Only the first ${availableSlots} images were kept to stay within the ${maxImages} limit.`,
      );
    }

    const newQueueItems = filesToProcess.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setCropQueue((prev) => [...prev, ...newQueueItems]);
  };

  // 2. Extract the cropped image and move to the next in queue
  const handleCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const saveCroppedImage = async () => {
    if (!cropQueue.length || !croppedAreaPixels) return;
    setIsCropping(true);

    try {
      const currentItem = cropQueue[0];
      const croppedFile = await getCroppedImg(
        currentItem.previewUrl,
        croppedAreaPixels,
        currentItem.file.name,
      );

      if (croppedFile) {
        onAddFiles([croppedFile]);
      }

      // Remove the processed file from the queue
      setCropQueue((prev) => {
        const newQueue = prev.slice(1);
        // Clean up memory
        URL.revokeObjectURL(currentItem.previewUrl);
        return newQueue;
      });

      // Reset cropper position for the next image
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (e) {
      toast.error("Failed to crop image.");
      console.error((e as Error).message);
    } finally {
      setIsCropping(false);
    }
  };

  const cancelCropping = () => {
    // Clear queue and revoke all object URLs to prevent memory leaks
    cropQueue.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setCropQueue([]);
  };

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
      if (droppedFiles.length > 0) queueFilesForCropping(droppedFiles);
    },
    [existingImages.length, newImages.length, maxImages],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 0) queueFilesForCropping(selectedFiles);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isAtLimit = existingImages.length + newImages.length >= maxImages;
  const activeCropItem = cropQueue[0];

  return (
    <div className="relative space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Images
      </label>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={isAtLimit ? undefined : handleDrop}
        onClick={() => {
          if (isAtLimit) {
            toast.error(`Maximum of ${maxImages} images reached.`);
            return;
          }
          fileInputRef.current?.click();
        }}
        className={`w-full rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isAtLimit
            ? "cursor-not-allowed border-red-200 bg-red-50/50"
            : "cursor-pointer border-gray-300 hover:bg-gray-50"
        }`}
      >
        <div className={isAtLimit ? "text-red-400" : "text-gray-500"}>
          <p className="font-medium">
            {isAtLimit
              ? "Image limit reached. Remove an image to upload more."
              : "Click to upload or drag and drop"}
          </p>
          <p className="mt-1 text-xs">
            We will help you crop them to a square • Max {maxImages} images
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          className="hidden"
          disabled={isAtLimit}
        />
      </div>

      {/* Image Previews */}
      {(existingImages.length > 0 || newImages.length > 0) && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {existingImages.map((url) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-lg border border-gray-200"
            >
              <img
                src={url}
                alt="Existing"
                className="aspect-square w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveExisting(url)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}

          {newImages.map((file, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-blue-200 shadow-[0_0_0_2px_rgba(59,130,246,0.5)]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="New upload"
                className="aspect-square w-full object-cover opacity-80"
              />
              <span className="absolute bottom-1 left-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
                NEW
              </span>
              <Button
                variant={"rounded"}
                size={"sm"}
                type="button"
                onClick={() => onRemoveNew(index)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Cropping Modal Overlay */}
      {activeCropItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-800">
                Crop Image{" "}
                {cropQueue.length > 1 ? `(1 of ${cropQueue.length})` : ""}
              </h3>
              <button
                onClick={cancelCropping}
                className="font-bold text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <div className="relative h-100 w-full bg-gray-100">
              <Cropper
                image={activeCropItem.previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
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
                  variant={"checkout"}
                  onClick={saveCroppedImage}
                  disabled={isCropping}
                  size={"sm"}
                  className="rounded-md border-none text-white"
                >
                  {isCropping ? "Saving..." : "Apply"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

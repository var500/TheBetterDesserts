import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  // Track which image is currently being viewed
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  // If there are no images, show a placeholder (or return null)
  if (!images || images.length === 0) {
    return (
      <div className="flex min-h-100 w-full items-center justify-center rounded-3xl bg-gray-100 md:w-1/2">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  // Only show the thumbnail gallery if there is more than 1 image
  const showThumbnails = images.length > 1;

  return (
    <div className="flex h-max w-full flex-col-reverse gap-4 md:w-1/2 md:flex-row lg:sticky lg:top-24">
      {/* Side Thumbnails */}
      {showThumbnails && (
        <div className="no-scrollbar flex w-full shrink-0 gap-4 overflow-x-auto md:w-20 md:flex-col md:overflow-y-auto">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(imgUrl)}
              // FIX: Added 'w-20 shrink-0 md:w-full' to prevent the flex container from stretching the thumbnail
              className={`aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white p-1 transition-all md:w-full ${
                selectedImage === imgUrl
                  ? "border-primary-dark border-2"
                  : "hover:border-primary-dark/50 border-2 border-transparent"
              }`}
            >
              <img
                src={imgUrl}
                alt={`${name} thumbnail ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Image View */}
      <div className="border-primary-dark/5 aspect-square max-h-125 w-full flex-1 overflow-hidden rounded-3xl border bg-white shadow-sm lg:max-h-162.5">
        <img
          src={selectedImage}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

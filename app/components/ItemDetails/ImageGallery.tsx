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
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-3xl min-h-100">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-max">
      {/* Side Thumbnails */}
      <div className="flex md:flex-col gap-4 w-full md:w-20 shrink-0 overflow-x-auto md:overflow-y-auto no-scrollbar">
        {images.map((imgUrl, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(imgUrl)}
            className={`aspect-square bg-white rounded-xl overflow-hidden cursor-pointer p-1 transition-all ${
              selectedImage === imgUrl
                ? "border-2 border-primary-dark"
                : "border-2 border-transparent hover:border-primary-dark/50"
            }`}
          >
            <img
              src={imgUrl}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Main Image View */}
      <div className="flex-1 w-full aspect-square md:aspect-3/4 lg:aspect-4/5 max-h-125 lg:max-h-162.5 bg-white rounded-3xl overflow-hidden border border-primary-dark/5 shadow-sm">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

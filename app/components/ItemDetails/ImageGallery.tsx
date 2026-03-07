import React from "react";

interface ImageGalleryProps {
  image: string;
  name: string;
}

export default function ImageGallery({ image, name }: ImageGalleryProps) {
  return (
    <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-max">
      <div className="hidden md:flex flex-col gap-4 w-20 shrink-0">
        <div className="aspect-square bg-white rounded-xl overflow-hidden border-2 border-primary-dark cursor-pointer p-1 transition-all hover:border-primary-dark/70">
          <img
            src={image}
            alt="thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex-1 w-full aspect-square md:aspect-3/4 lg:aspect-4/5 max-h-125 lg:max-h-162.5 bg-white rounded-3xl overflow-hidden border border-primary-dark/5 shadow-sm">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

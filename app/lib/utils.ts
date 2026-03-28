import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const BACKEND_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const RAZORPAY_PUBLIC_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

import type { Zone } from "~/common/types";

export const getZoneFromPincode = (pincode: string): Zone => {
  // Fallback for empty/invalid pincodes
  if (!pincode || pincode.length < 3) return "PAN_INDIA";

  const prefix = pincode.substring(0, 3);

  // 122 -> Gurgaon
  if (prefix === "122") {
    return "GURGAON";
  }

  if (["110", "201", "121"].includes(prefix)) {
    return "DELHI_NCR";
  }

  return "PAN_INDIA";
};

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  fileName: string = "cropped-image.jpg",
): Promise<File | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  // --- COMPRESSION SETTINGS ---
  const MAX_DIMENSION = 1080; // Max width/height for web-friendly images
  const COMPRESSION_QUALITY = 0.85; // 85% quality reduces file size massively with no visible loss

  // Calculate the scale factor if the cropped area is larger than our max dimension
  let outputWidth = pixelCrop.width;
  let outputHeight = pixelCrop.height;

  if (outputWidth > MAX_DIMENSION) {
    outputHeight = Math.round((outputHeight * MAX_DIMENSION) / outputWidth);
    outputWidth = MAX_DIMENSION;
  }

  // Set the canvas to the new, smaller dimensions
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Draw the image, scaling it down in the process to fit the new canvas
  ctx.drawImage(
    image,
    pixelCrop.x, // start X on original image
    pixelCrop.y, // start Y on original image
    pixelCrop.width, // width to crop from original
    pixelCrop.height, // height to crop from original
    0, // place at X=0 on canvas
    0, // place at Y=0 on canvas
    outputWidth, // scale to this width
    outputHeight, // scale to this height
  );

  return new Promise((resolve) => {
    // Export with the tuned compression quality
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }

        // Ensure the file extension is updated to .jpg if it was originally a .png
        const newFileName = fileName.replace(/\.[^/.]+$/, "") + ".jpg";
        const file = new File([blob], newFileName, { type: "image/jpeg" });
        resolve(file);
      },
      "image/jpeg",
      COMPRESSION_QUALITY,
    );
  });
}

const whatsappNumber = "919211988622";

export const WhatsappLink = (message?: string) => {
  let link;
  if (message) {
    const whatsappMessage = encodeURIComponent(message);
    link = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    return link;
  }
  return `https://wa.me/${whatsappNumber}`;
};

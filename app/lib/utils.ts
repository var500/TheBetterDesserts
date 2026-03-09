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

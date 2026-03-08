import { BACKEND_API_URL } from "~/lib/utils";

export const sendOtp = async (email: string) => {
  const response = await fetch(`${BACKEND_API_URL}/auth/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error("Failed to send OTP");
  return response.json();
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await fetch(`${BACKEND_API_URL}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) throw new Error("Failed to send OTP");
  return response.json();
};

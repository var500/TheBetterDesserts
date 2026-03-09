import { BACKEND_API_URL } from "~/lib/utils";

export const adminLogin = async (credentials: {
  email: string;
  password: string;
}): Promise<{
  accessToken: string;
  adminId: string;
  message: string;
}> => {
  const response = await fetch(`${BACKEND_API_URL}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Server error raw text:", text);
    throw new Error("Server responded with an error");
  }

  return response.json();
};

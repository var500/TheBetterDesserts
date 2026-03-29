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
    // 1. Try to parse the backend's custom JSON error
    let errorMessage = "Server responded with an error";
    try {
      const errorData = await response.json();
      // 2. Extract the "message" field if it exists
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (parseError) {
      console.error("Failed to parse error response as JSON", parseError);
    }

    // 3. Throw the actual message so React Query can catch it!
    throw new Error(errorMessage);
  }

  return response.json();
};

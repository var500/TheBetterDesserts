import { BACKEND_API_URL } from "~/lib/utils";
import { useAuthStore } from "~/store/authStore";

export const createCategory = async (data: {
  title: string;
  description?: string;
}): Promise<{ id: string; title: string; description: string }> => {
  const { token } = useAuthStore();
  const response = await fetch(`${BACKEND_API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};

export const getAll = async () => {
  const response = await fetch(`${BACKEND_API_URL}/category`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get category");
  }

  return response.json();
};

import type {
  AddAddressInput,
  Address,
  OtpVerifyResponse,
  UpdateProfilePayload,
} from "~/common/types";

import { BACKEND_API_URL } from "~/lib/utils";
import { type User } from "~/store/authStore";

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
}): Promise<OtpVerifyResponse> => {
  const response = await fetch(`${BACKEND_API_URL}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) throw new Error("Failed to send OTP");
  return response.json();
};

export const fetchAddresses = async (token: string): Promise<Address[]> => {
  const response = await fetch(`${BACKEND_API_URL}/users/addresses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch addresses");
  }
  return response.json();
};

export const addAddress = async ({
  token,
  data,
}: {
  token: string;
  data: AddAddressInput;
}): Promise<Address> => {
  const response = await fetch(`${BACKEND_API_URL}/users/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add address");
  }
  return response.json();
};

export const updateAddress = async ({
  addressId,
  token,
  data,
}: {
  addressId: string;
  token: string;
  data: Partial<Address>;
}) => {
  const response = await fetch(
    `${BACKEND_API_URL}/users/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update address");
  return response.json();
};

export const deleteAddress = async ({
  token,
  addressId,
}: {
  token: string;
  addressId: string;
}) => {
  const response = await fetch(
    `${BACKEND_API_URL}/users/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Failed to delete address");
  return response.json();
};

export const updateProfileApi = async (
  data: UpdateProfilePayload,
  token: string,
) => {
  const response = await fetch(`${BACKEND_API_URL}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
  }

  return response.json();
};

export const getUser = async (
  token: string,
): Promise<{ message: string; user: User }> => {
  const response = await fetch(`${BACKEND_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch addresses");
  }
  return response.json();
};

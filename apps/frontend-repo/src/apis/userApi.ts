import type { User } from "@ebuddy/shared";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002" // Local BE URL
    : "https://your-production-url.com/api";

export const fetchUser = async (uid: string, token: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/fetch-user-data/${uid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }

  return await response.json();
};

export const updateUser = async (
  uid: string,
  data: Partial<User>,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/update-user-data/${uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

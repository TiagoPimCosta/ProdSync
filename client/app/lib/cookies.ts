"use server";

import { cookies } from "next/headers";

interface UserPayload {
  id: number;
  name: string;
  username: string;
  createdAt: string;
  iat: number;
  exp: number;
}

export const setAuthToken = (token: string): void => {
  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const getAuthToken = async (): Promise<string | undefined> => {
  return cookies().get("authToken")?.value;
};

export const removeAuthToken = async (): Promise<void> => {
  cookies().delete("authToken");
};

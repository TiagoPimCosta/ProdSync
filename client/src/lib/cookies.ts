"use server";

import { cookies } from "next/headers";

export const setAuthToken = (token: string): void => {
  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    //secure: true, TODO: Make this available to production time
  });
};

export const getAuthToken = async (): Promise<string | undefined> => {
  return cookies().get("authToken")?.value;
};

export const removeAuthToken = async (): Promise<void> => {
  cookies().delete("authToken");
};

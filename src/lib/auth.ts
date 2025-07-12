import { removeAuthToken } from "./cookies";
import { fetchWithAuth } from "./fetch";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface userStatusResponse {
  id: number;
  idNumber: number;
  name: string;
  role: string;
  username: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: string;
  iat: number;
  exp: number;
}

export async function logout(): Promise<void> {
  await removeAuthToken();
}

export async function userStatus(): Promise<userStatusResponse | null> {
  try {
    const response = await fetchWithAuth(API_ENDPOINT_URL + "/auth/status");

    if (!response) {
      throw new Error("User could not be found failed");
    }

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

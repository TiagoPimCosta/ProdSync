import { removeAuthToken } from "./cookies";
import { fetchWithAuth } from "./fetch";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

interface authenticateResponse {
  token: string;
  role: string;
}

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

export async function login(
  username: string,
  password: string
): Promise<authenticateResponse | void> {
  try {
    const response = await fetch(API_ENDPOINT_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status !== 201) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data; // Assuming the token is in data.token
  } catch (error) {
    console.error(error);
  }
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

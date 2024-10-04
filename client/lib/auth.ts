import { removeAuthToken } from "./cookies";
import { fetchWithAuth } from "./fetch";

interface authenticateResponse {
  token: string;
  role: string;
}

interface userStatusResponse {
  id: number;
  name: string;
  role: string;
  username: string;
  createdAt: string;
  iat: number;
  exp: number;
}

export async function login(
  username: string,
  password: string
): Promise<authenticateResponse | void> {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
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
    const response = await fetchWithAuth(
      "http://localhost:8080/api/auth/status"
    );

    if (!response) {
      throw new Error("User could not be found failed");
    }

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

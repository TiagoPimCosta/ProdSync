import { getAuthToken } from "./cookies";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = await getAuthToken();
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

import { getAuthToken } from './cookies';

export async function fetchWithAuth<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAuthToken();

  const baseUrl =
    typeof window === 'undefined'
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

  const url = `${baseUrl}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Request failed: ${response.status} ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('fetchWithAuth error:', error);
    throw error;
  }
}

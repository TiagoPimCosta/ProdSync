import { getAuthToken } from './cookies';

export async function fetchWithAuth(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
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

  return fetch(url, {
    ...options,
    headers,
  });
}

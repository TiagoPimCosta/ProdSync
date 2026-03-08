import { removeAuthToken } from "./cookies";

export async function logout(): Promise<void> {
  await removeAuthToken();
}

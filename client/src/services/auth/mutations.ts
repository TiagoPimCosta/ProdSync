import { toastError } from "@/src/utils/toasts";
import { useMutation } from "@tanstack/react-query";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(body: LoginBody) {
  return fetch(API_ENDPOINT_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginBody>({
    mutationFn: async (body) => {
      const response = await login(body);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data as LoginResponse;
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
}

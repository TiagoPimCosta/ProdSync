import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation } from "@tanstack/react-query";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface CreateLineBodyParams {
  name: string;
}

export async function createLine(body: CreateLineBodyParams) {
  return fetch(API_ENDPOINT_URL + "/lines/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useCreateLine() {
  return useMutation<ApiResponseMessage, Error, CreateLineBodyParams>({
    mutationFn: async (vars) => {
      const response = await createLine(vars);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data as ApiResponseMessage;
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
}

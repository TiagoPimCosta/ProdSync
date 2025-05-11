import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation } from "@tanstack/react-query";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface CreateRecordBodyParams {
  userId: number;
  machineId: number;
}

export async function createRecord(body: CreateRecordBodyParams) {
  return fetch(API_ENDPOINT_URL + "/records/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useCreateRecord() {
  return useMutation<ApiResponseMessage, Error, CreateRecordBodyParams>({
    mutationFn: async (vars) => {
      const response = await createRecord(vars);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data as ApiResponseMessage;
    },
    onError: (error) => {
      toastError(error.message);
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
    },
  });
}

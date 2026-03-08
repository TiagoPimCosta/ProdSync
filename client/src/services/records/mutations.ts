import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation<ApiResponseMessage, Error, CreateRecordBodyParams>({
    mutationFn: async (body) => {
      const response = await createRecord(body);
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
    onSuccess: (data, body) => {
      toastSuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["records", "recordsHistory", body.userId.toString()],
      });
    },
  });
}

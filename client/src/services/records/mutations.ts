import { toastError, toastSuccess } from '@/src/utils/toasts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '@/src/lib/fetch';

export interface CreateRecordBodyParams {
  userId: number;
  machineId: number;
}

export async function createRecord(body: CreateRecordBodyParams) {
  return fetchWithAuth('/records/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
        queryKey: ['records', 'recordsHistory', body.userId.toString()],
      });
    },
  });
}

export async function deleteRecord(recordId: string) {
  return fetchWithAuth(`/records/${recordId}`, {
    method: 'DELETE',
  });
}

export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponseMessage, Error, string>({
    mutationFn: async (recordId) => {
      const response = await deleteRecord(recordId);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json() as Promise<ApiResponseMessage>;
    },
    onError: (error) => {
      toastError(error.message);
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
}

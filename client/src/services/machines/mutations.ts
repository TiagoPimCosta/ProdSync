import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface CreateMachineBodyParams {
  name: string;
  line?: string;
  cadence: number;
}

export async function createMachine(body: CreateMachineBodyParams) {
  return fetch(API_ENDPOINT_URL + "/machines/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useCreateMachine() {
  return useMutation<ApiResponseMessage, Error, CreateMachineBodyParams>({
    mutationFn: async (vars) => {
      const response = await createMachine(vars);
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

export interface UpdateMachineUserBodyParams {
  machineId: number;
  userId: string;
}

export async function updateMachineUser({ machineId, userId }: UpdateMachineUserBodyParams) {
  return fetch(API_ENDPOINT_URL + `/machines/${machineId}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
}

export function useUpdateMachineUser(machineId: number) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponseMessage, Error, string>({
    mutationFn: async (userId) => {
      const response = await updateMachineUser({ machineId, userId });
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
      queryClient.invalidateQueries({ queryKey: ["machine", machineId] });
    },
  });
}

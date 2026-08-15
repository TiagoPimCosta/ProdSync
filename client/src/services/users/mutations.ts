import { toastError, toastSuccess } from '@/src/utils/toasts';
import { useMutation } from '@tanstack/react-query';
import { fetchWithAuth } from '@/src/lib/fetch';

export interface CreateUserBodyParams {
  idNumber: number;
  name: string;
  role: string;
  username: string;
  password: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
}

export async function createUser(body: CreateUserBodyParams) {
  return fetchWithAuth('/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function useCreateUser() {
  return useMutation<ApiResponseMessage, Error, CreateUserBodyParams>({
    mutationFn: async (vars) => {
      const response = await createUser(vars);
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

export interface UpdateUserBody {
  idNumber: number;
  name: string;
  role: string;
  username: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
}

export interface UpdateUserParams {
  id: string;
  user: UpdateUserBody;
}

export async function updateUser(params: UpdateUserParams) {
  const { id, user } = params;
  return fetchWithAuth(`/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export function useUpdateUser() {
  return useMutation<ApiResponseMessage, Error, UpdateUserParams>({
    mutationFn: async (vars) => {
      const response = await updateUser(vars);
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

interface UserDeleteParams {
  userId: string;
}

function deleteUser(params: UserDeleteParams) {
  const { userId } = params;

  return fetchWithAuth(`/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export function useDeleteUser() {
  return useMutation<ApiResponseMessage, Error, UserDeleteParams>({
    mutationFn: async (vars) => {
      const { userId } = vars;
      const response = await deleteUser({ userId });
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

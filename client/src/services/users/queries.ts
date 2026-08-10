import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationParams } from '../services.Schemas';
import { handleApiResponseError } from '@/src/utils/errors';
import { parseQueryParams } from '@/src/utils/services';
import { GetUsersParamsSchema } from '@/src/schemas/users/getUsersSchema';
import { GetUserParamsSchema } from '@/src/schemas/users/getUserSchema';
import { fetchWithAuth } from '@/src/lib/fetch';

export interface UserObj {
  id: number;
  idNumber: number;
  name: string;
  role: string;
  username: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  status: boolean;
  admission: string; // ISO date format
}
export type GetUsersParams = GetUsersParamsSchema & Partial<PaginationParams>;
export type GetUsersResponse = ApiGetListResponse<UserObj[]> & Pagination;

export function getUsers(params: GetUsersParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(
    queryParams as Record<string, string>,
  ).toString();

  return fetchWithAuth(`/users?${queryString}`);
}

export function useGetUsers(params: GetUsersParams) {
  const { page, size, name, role, status, startAdmission, endAdmission } =
    params;

  return useQuery({
    queryKey: [
      'users',
      page,
      size,
      name,
      role,
      status,
      startAdmission,
      endAdmission,
    ],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getUsers(params);
      return (await response.json()) as GetUsersResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export type GetUserParams = GetUserParamsSchema;
export type GetUserResponse = UserObj;

export function getUser(params: GetUserParams) {
  return fetchWithAuth(`/users/${params.id}`);
}

export function useGetUser(params: GetUserParams) {
  const { id } = params;

  return useQuery({
    queryKey: ['user', id],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getUser(params);
      return (await response.json()) as GetUserResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

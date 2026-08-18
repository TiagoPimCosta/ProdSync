import { PaginationParams } from '../services.Schemas';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { parseQueryParams } from '@/src/utils/services';
import { handleApiResponseError } from '@/src/utils/errors';
import { GetMachinesParamsSchema } from '@/src/schemas/machines/getMachinesSchema';
import { GetUserMachinesParamsSchema } from '@/src/schemas/machines/getUserMachinesSchema';
import { GetMachineParamsSchema } from '@/src/schemas/machines/getMachineSchema';
import { fetchWithAuth } from '@/src/lib/fetch';

export interface MachineObj {
  id: string;
  name: string;
  status: boolean;
  line: {
    id: string;
    name: string;
    status: boolean;
    createdAt: string;
  };
  user: {
    id: string;
    idNumber: number;
    name: string;
    role: string;
    username: string;
    cc: string;
    nif: string;
    phone: string;
    email: string;
    status: false;
    admission: string;
  };
}

export type GetMachinesParams = GetMachinesParamsSchema &
  Partial<PaginationParams>;
export type GetMachinesResponse = ApiGetListResponse<MachineObj[]> & Pagination;

export function getMachines(params: GetMachinesParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(
    queryParams as Record<string, string>,
  ).toString();

  return fetchWithAuth(`/machines?${queryString}`);
}

export function useGetMachines(params: GetMachinesParams) {
  const { page, size, name, line, user, status } = params;

  return useQuery({
    queryKey: ['machines', page, size, name, line, user, status],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getMachines(params);
      return (await response.json()) as GetMachinesResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export type GetMachineParams = GetMachineParamsSchema;
export type GetMachineResponse = MachineObj;

export function getMachine(params: GetMachineParams) {
  return fetchWithAuth(`/machines/${params.machineId}`);
}

export function useGetMachine(params: GetMachineParams) {
  const { machineId } = params;

  return useQuery({
    queryKey: ['machine', machineId],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getMachine(params);
      return (await response.json()) as GetMachineResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export type GetUserMachinesParams = GetUserMachinesParamsSchema;
export type GetUserMachinesResponse = MachineObj[];

export function getUserMachines(params: GetUserMachinesParams) {
  const { id } = params;
  return fetchWithAuth(`/machines/user/${id}`);
}

export function useGetUserMachines(params: GetUserMachinesParams) {
  const { id } = params;

  return useQuery({
    queryKey: ['machines', 'user', id],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getUserMachines(params);
      return (await response.json()) as GetUserMachinesResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

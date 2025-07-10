import { PaginationParams } from "../services.Schemas";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { parseQueryParams } from "@/src/utils/services";
import { handleApiResponseError } from "@/src/utils/errors";
import { GetMachinesParamsSchema } from "@/src/schemas/machines/getMachinesSchema";
import { GetUserMachinesParamsSchema } from "@/src/schemas/machines/getUserMachinesSchema";
import { GetMachineParamsSchema } from "@/src/schemas/machines/getMachineSchema";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface MachineObj {
  id: number;
  name: string;
  status: boolean;
  line: {
    id: number;
    name: string;
    status: boolean;
    createdAt: string;
  };
  user: {
    id: number;
    idNumber: number;
    name: string;
    role: string;
    username: string;
    password: string;
    cc: string;
    nif: string;
    phone: string;
    email: string;
    status: false;
    admission: string;
  };
}

export type GetMachinesParams = GetMachinesParamsSchema & Partial<PaginationParams>;
export type GetMachinesResponse = ApiGetListResponse<MachineObj[]> & Pagination;

export function getMachines(params: GetMachinesParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/machines?" + queryString;

  return fetch(url);
}

export function useGetMachines(params: GetMachinesParams) {
  const { page, size, name, line, user, status } = params;

  return useQuery({
    queryKey: ["machines", page, size, name, line, user, status],
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
  const url = API_ENDPOINT_URL + "/machines/" + params.machineId;
  return fetch(url);
}

export function useGetMachine(params: GetMachineParams) {
  const { machineId } = params;

  return useQuery({
    queryKey: ["machine", machineId],
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
  const url = API_ENDPOINT_URL + `/machines/user/${id}`;
  return fetch(url);
}

export function useGetUserMachines(params: GetUserMachinesParams) {
  const { id } = params;

  return useQuery({
    queryKey: ["machines", "user", id],
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

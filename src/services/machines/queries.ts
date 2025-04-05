import { PaginationParams } from "../services.Schemas";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseQueryParams } from "@/src/utils/services";
import { handleApiResponseError } from "@/src/utils/errors";

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

export type GetMachinesParams = Partial<PaginationParams>;
export type GetMachinesResponse = ApiGetListResponse<MachineObj[]> & Pagination;

export function getMachines(params: GetMachinesParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/machines?" + queryString;

  return fetch(url);
}

export function useGetMachines(params: GetMachinesParams) {
  const { page, size } = params;

  return useQuery({
    queryKey: ["machines", page, size],
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

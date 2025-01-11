import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../services.Schemas";
import { handleApiResponseError } from "@/src/utils/errors";
import { parseQueryParams } from "@/src/utils/services";
import { GetUserParamsSchema, GetUsersParamsSchema } from "@/src/schemas/usersSchema";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export interface UserObj {
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
  status: boolean;
  admission: string; // ISO date format
}
export type GetUsersParams = GetUsersParamsSchema & Partial<PaginationParams>;
export type GetUsersResponse = ApiGetListResponse<UserObj[]> & Pagination;

export function getUsers(params: GetUsersParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/users?" + queryString;

  return fetch(url);
}

export function useGetUsers(params: GetUsersParams) {
  const { page, size, role } = params;

  return useQuery({
    queryKey: ["users", page, size, role],
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
  const url = API_ENDPOINT_URL + "/users/" + params.id;
  return fetch(url);
}

export function useGetUser(params: GetUserParams) {
  const { id } = params;

  return useQuery({
    queryKey: ["user", id],
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

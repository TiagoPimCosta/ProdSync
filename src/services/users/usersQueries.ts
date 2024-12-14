import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../services.Schemas";
import { handleApiResponseError } from "@/src/utils/errors";
import { parseQueryParams } from "@/src/utils/services";
import { GetUsersParamsSchema } from "@/src/schemas/usersSchema";

interface UserObj {
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
  const baseUrl = "http://localhost:8080/api/users";

  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = `${baseUrl}?${queryString}`;

  return fetch(url);
}

export function useGetUsers(params: GetUsersParams) {
  const { page, size } = params;

  return useQuery({
    queryKey: ["users", page, size],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      //await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await getUsers(params);
      return (await response.json()) as GetUsersResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

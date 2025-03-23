import { GetLinesParamsSchema } from "@/src/schemas/lines/getLinesSchema";
import { PaginationParams } from "../services.Schemas";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseQueryParams } from "@/src/utils/services";
import { handleApiResponseError } from "@/src/utils/errors";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

interface Machine {
  id: number;
  name: string;
  status: boolean;
}

export interface LineObj {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  machines: Machine[];
}
export type GetLinesParams = GetLinesParamsSchema & Partial<PaginationParams>;
export type GetLinesResponse = ApiGetListResponse<LineObj[]> & Pagination;

export function getLines(params: GetLinesParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/lines?" + queryString;

  return fetch(url);
}

export function useGetLines(params: GetLinesParams) {
  const { page, size, name, status } = params;

  return useQuery({
    queryKey: ["users", page, size, name, status],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getLines(params);
      return (await response.json()) as GetLinesResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

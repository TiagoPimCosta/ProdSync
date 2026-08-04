import { GetLinesParamsSchema } from '@/src/schemas/lines/getLinesSchema';
import { PaginationParams } from '../services.Schemas';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { parseQueryParams } from '@/src/utils/services';
import { handleApiResponseError } from '@/src/utils/errors';
import { GetLineParamsSchema } from '@/src/schemas/lines/getLineSchema';
import { fetchWithAuth } from '@/src/lib/fetch';

interface Machine {
  id: number;
  cadence: number;
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
  const queryString = new URLSearchParams(
    queryParams as Record<string, string>,
  ).toString();

  return fetchWithAuth(`/lines?${queryString}`);
}

export function useGetLines(params: GetLinesParams) {
  const { page, size, name, status } = params;

  return useQuery({
    queryKey: ['lines', page, size, name, status],
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

export type GetLineParams = GetLineParamsSchema;
export type GetLineResponse = LineObj;

export function getLine(params: GetLineParams) {
  return fetchWithAuth(`/lines/${params.lineId}`);
}

export function useGetLine(params: GetLineParams) {
  const { lineId } = params;

  return useQuery({
    queryKey: ['line', lineId],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getLine(params);
      return (await response.json()) as GetLineResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

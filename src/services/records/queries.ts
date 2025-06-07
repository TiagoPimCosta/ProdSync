import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../services.Schemas";
import { handleApiResponseError } from "@/src/utils/errors";
import { parseQueryParams } from "@/src/utils/services";
import { GetRecordsParamsSchema } from "@/src/schemas/records/getRecordsSchema";
import { GetHourlyStatsRecordsParamsSchema } from "@/src/schemas/records/getHourlyStatsRecordsParamsSchema";
import { GetDailyStatsRecordsParamsSchema } from "@/src/schemas/records/getDailyStatsRecordsParamsSchema";

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

export interface RecordObj {
  id: number;
  createdAt: string;
  user: UserObj;
  machine: {
    id: number;
    name: string;
    status: true;
  };
}

export type GetRecordsParams = GetRecordsParamsSchema & Partial<PaginationParams>;
export type GetRecordsResponse = ApiGetListResponse<RecordObj[]> & Pagination;

export function getRecords(params: GetRecordsParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/records?" + queryString;

  return fetch(url);
}

export function useGetRecords(params: GetRecordsParams) {
  const { page, size, user, machine, startPeriod, endPeriod } = params;

  return useQuery({
    queryKey: ["records", page, size, user, machine, startPeriod, endPeriod],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getRecords(params);
      return (await response.json()) as GetRecordsResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export function getHourlyStatsRecords(params: GetHourlyStatsRecordsParamsSchema) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/records/hourlyStats?" + queryString;

  return fetch(url);
}

export function useGetHourlyStatsRecords(params: GetHourlyStatsRecordsParamsSchema) {
  const { userId, lineId, machineId, startDate, endDate } = params;

  return useQuery({
    queryKey: ["records", "hourlyStats", userId, lineId, machineId, startDate, endDate],
    placeholderData: keepPreviousData,
    /*     refetchInterval: 30000, */
    queryFn: async () => {
      const response = await getHourlyStatsRecords(params);
      return (await response.json()) as {
        hour: string;
        count: number;
      }[];
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export function getDailyStatsRecords(params: GetDailyStatsRecordsParamsSchema) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/records/dailyStats?" + queryString;

  return fetch(url);
}

export function useGetDailyStatsRecords(params: GetDailyStatsRecordsParamsSchema) {
  const { userId, lineId, machineId, startDate, endDate } = params;

  return useQuery({
    queryKey: ["records", "dailyStats", userId, lineId, machineId, startDate, endDate],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getDailyStatsRecords(params);
      return (await response.json()) as {
        hour: string;
        count: number;
      }[];
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

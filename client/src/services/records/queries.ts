import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../services.Schemas";
import { handleApiResponseError } from "@/src/utils/errors";
import { parseQueryParams } from "@/src/utils/services";
import { GetRecordsParamsSchema } from "@/src/schemas/records/getRecordsSchema";
import { GetHourlyStatsRecordsParamsSchema } from "@/src/schemas/records/getHourlyStatsRecordsParamsSchema";
import { GetDailyStatsRecordsParamsSchema } from "@/src/schemas/records/getDailyStatsRecordsParamsSchema";
import { GetRecordsHistoryParamsSchema } from "@/src/schemas/records/getRecordsHistoryParamsSchema";

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
  timeSincePrevious: number | null;
  user: UserObj;
  machine: {
    id: number;
    name: string;
    cadence: number;
    status: boolean;
    line: {
      id: number;
      name: string;
      status: boolean;
      createdAt: string;
    };
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

export type GetRecordsHistoryParams = GetRecordsHistoryParamsSchema;
export type GetRecordsHistoryResponse = RecordObj[];

export function getRecordsHistory(params: GetRecordsHistoryParams) {
  const queryParams = parseQueryParams(params);
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const url = API_ENDPOINT_URL + "/records/recordHistory?" + queryString;

  return fetch(url);
}

export function useGetRecordsHistory(params: GetRecordsHistoryParams) {
  const { userId } = params;

  return useQuery({
    queryKey: ["records", "recordsHistory", userId],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getRecordsHistory(params);
      return (await response.json()) as GetRecordsHistoryResponse;
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
    /* refetchInterval: 5000, */
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

export interface DashboardKpisResponse {
  todayRecords: number;
  yesterdayRecords: number;
  monthRecords: number;
  lastMonthRecords: number;
  activeUsers: number;
  activeMachines: number;
}

export function useGetDashboardKpis() {
  return useQuery({
    queryKey: ["records", "kpis"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINT_URL + "/records/kpis");
      return (await response.json()) as DashboardKpisResponse;
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
    /* refetchInterval: 5000, */
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

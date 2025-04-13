import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { handleApiResponseError } from "@/src/utils/errors";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export function getUsersOptions() {
  const url = API_ENDPOINT_URL + "/options/users";

  return fetch(url);
}

export function useGetUsersOptions() {
  return useQuery({
    queryKey: ["options", "users"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getUsersOptions();
      return (await response.json()) as SelectOption[];
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

export function getMachinesOptions() {
  const url = API_ENDPOINT_URL + "/options/machines";

  return fetch(url);
}

export function useGetMachinesOptions() {
  return useQuery({
    queryKey: ["options", "machines"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getMachinesOptions();
      return (await response.json()) as SelectOption[];
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

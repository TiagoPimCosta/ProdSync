import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { handleApiResponseError } from '@/src/utils/errors';
import { fetchWithAuth } from '@/src/lib/fetch';

export function getUsersOptions() {
  return fetchWithAuth('/options/users');
}

export function useGetUsersOptions() {
  return useQuery({
    queryKey: ['options', 'users'],
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
  return fetchWithAuth('/options/machines');
}

export function useGetMachinesOptions() {
  return useQuery({
    queryKey: ['options', 'machines'],
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

export function getLinesOptions() {
  return fetchWithAuth('/options/lines');
}

export function useGetLinesOptions() {
  return useQuery({
    queryKey: ['options', 'lines'],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getLinesOptions();
      return (await response.json()) as SelectOption[];
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

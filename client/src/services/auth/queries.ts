import { useQuery } from '@tanstack/react-query';
import { handleApiResponseError } from '@/src/utils/errors';
import { fetchWithAuth } from '@/src/lib/fetch';

export type UserStatusResponse = {
  id: number;
  idNumber: number;
  name: string;
  role: string;
  username: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: string;
  iat: number;
  exp: number;
};

export function getUserStatus() {
  return fetchWithAuth('/auth/status');
}

export function useGetUserStatus() {
  return useQuery({
    queryKey: ['userStatus'],
    queryFn: async () => {
      const response = await getUserStatus();
      return (await response.json()) as UserStatusResponse;
    },
    throwOnError: (error) => {
      handleApiResponseError(error);
      return false;
    },
  });
}

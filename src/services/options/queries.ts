import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams } from "../services.Schemas";
import { handleApiResponseError } from "@/src/utils/errors";
import { parseQueryParams } from "@/src/utils/services";
import { GetRecordsParamsSchema } from "@/src/schemas/records/getRecordsSchema";

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

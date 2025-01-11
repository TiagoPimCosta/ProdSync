import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation } from "@tanstack/react-query";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

interface UserDeleteParams {
  userId: number;
}

function userDelete(params: UserDeleteParams) {
  const { userId } = params;

  return fetch(API_ENDPOINT_URL + "/users/" + userId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  });
}

export function useUserDelete() {
  return useMutation<ApiResponseMessage, Error, UserDeleteParams>({
    mutationFn: async (vars) => {
      const { userId } = vars;
      const response = await userDelete({ userId });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
      const data = await response.json();
      return data as ApiResponseMessage;
    },
    onError: (error) => {
      toastError(error.message);
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
    },
  });
}

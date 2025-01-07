import { toastError, toastSuccess } from "@/src/utils/toasts";
import { useMutation } from "@tanstack/react-query";

interface UserDeleteParams {
  userId: string;
}

function userDelete(params: UserDeleteParams) {
  const baseUrl = "http://localhost:8080/api/users";
  const { userId } = params;

  const url = `${baseUrl}/${userId}`;
  return fetch(url, {
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

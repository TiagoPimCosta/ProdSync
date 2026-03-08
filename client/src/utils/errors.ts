import { HTTPError } from "ky";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toastError } from "./toasts";

function setApiResponseErrors<T, Y extends FieldValues>(
  errorResponse: ApiResponseError<T>,
  form?: UseFormReturn<Y>
) {
  toastError(errorResponse.message);

  if (!form) {
    return;
  }

  if (errorResponse.errors && typeof errorResponse.errors !== "string") {
    for (const key in errorResponse.errors) {
      const errorKey = key as keyof T;
      const error = errorResponse.errors?.[errorKey].join(", ");
      form.setError(errorKey as unknown as Path<Y>, { message: error });
    }
  }
}

export async function handleApiResponseError<T, Y extends FieldValues>(
  error: unknown,
  form?: UseFormReturn<Y>
) {
  if (error instanceof HTTPError) {
    const errorResponse = (await error.response?.json()) as ApiResponseError<T>;
    setApiResponseErrors<T, Y>(errorResponse, form);
  }
}

interface ApiResponseError<T> {
  message: string;
  errors?: Record<keyof T, string[]>;
}

interface ApiGetListResponse<T> {
  items?: T;
}

interface Pagination {
  page: number;
  size: number;
  totalItems: number;
}

interface SelectOption {
  value: string;
  label: string;
}

interface ApiResponseMessage {
  message: string;
}

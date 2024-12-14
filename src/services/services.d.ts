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

export interface PaginatedResponse<T> {
  limit: number;
  page: number;
  total: number;
  results: T[];
}

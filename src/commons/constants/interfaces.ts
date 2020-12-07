export interface PaginatedResponse<T> {
  limit: number;
  offset: number;
  total: number;
  results: T[];
}

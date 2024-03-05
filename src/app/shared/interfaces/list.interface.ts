export interface List<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: T;
}

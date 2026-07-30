export interface UserFilterState {
  query: string;
  role?: 'admin' | 'accountant' | 'manager';
  status?: 'active' | 'inactive';
  page: number;
  pageSize: number;
}

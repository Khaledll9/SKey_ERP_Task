export type UserRole = 'admin' | 'accountant' | 'manager';

export interface UserListDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  initials: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface CreateUserRequest {
  tenantId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'active' | 'inactive';
  mobile?: string;
  department?: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  mobile?: string;
  department?: string;
}

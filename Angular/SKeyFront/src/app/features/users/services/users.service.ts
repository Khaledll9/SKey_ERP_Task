import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateUserRequest, UpdateUserRequest, UserListDto } from '../models/user.model';
import { UserFilterState } from '../models/user-filter-state.model';

interface ApiUserDto {
  id: string;
  userName: string;
  phoneNumber: string;
  email: string;
  accountStatus: number;
  roleId: string;
  roleName?: string | null;
}

const ROLE_IDS = {
  admin: '11111111-1111-1111-1111-111111111111',
  accountant: '22222222-2222-2222-2222-222222222222',
  manager: '33333333-3333-3333-3333-333333333333'
} as const;

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  getUsers(filter: UserFilterState): Observable<UserListDto[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<ApiUserDto[]>(this.baseUrl).pipe(
      map((users) => {
        let mapped = users.map((u) => this.toListDto(u));

        if (filter.query) {
          const q = filter.query.toLowerCase();
          mapped = mapped.filter(
            (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
          );
        }
        if (filter.role) {
          mapped = mapped.filter((u) => u.role === filter.role);
        }
        if (filter.status) {
          mapped = mapped.filter((u) => u.status === filter.status);
        }

        this.loading.set(false);
        return mapped;
      })
    );
  }

  createUser(payload: CreateUserRequest): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    const body = {
      userName: payload.name,
      email: payload.email,
      password: payload.password,
      phoneNumber: payload.mobile?.trim() || this.fallbackPhone(),
      accountStatus: payload.status === 'active' ? 0 : 1,
      roleId: this.toRoleId(payload.role)
    };

    return this.http.post(`${this.baseUrl}/create`, body).pipe(
      map(() => {
        this.loading.set(false);
      })
    );
  }

  updateUser(payload: UpdateUserRequest): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    const body = {
      id: payload.id,
      userName: payload.name,
      email: payload.email,
      phoneNumber: payload.mobile?.trim() || this.fallbackPhone(),
      accountStatus: payload.status === 'active' ? 0 : 1,
      roleId: this.toRoleId(payload.role),
      password: ''
    };

    return this.http.put(`${this.baseUrl}/update`, body).pipe(
      map(() => {
        this.loading.set(false);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toListDto(user: ApiUserDto): UserListDto {
    const name = user.userName || user.email;
    return {
      id: user.id,
      name,
      email: user.email,
      role: this.toFrontRole(user.roleName, user.roleId),
      status: user.accountStatus === 0 ? 'active' : 'inactive',
      initials: name
        .split(' ')
        .filter(Boolean)
        .map((p) => p[0])
        .join('')
        .slice(0, 2),
      createdAt: new Date().toISOString()
    };
  }

  private toRoleId(role: CreateUserRequest['role']): string {
    return ROLE_IDS[role];
  }

  private toFrontRole(
    roleName: string | null | undefined,
    roleId: string
  ): UserListDto['role'] {
    const name = (roleName || '').toLowerCase() as UserListDto['role'];
    if (name in ROLE_IDS) return name;
    const entry = Object.entries(ROLE_IDS).find(([, id]) => id === roleId);
    return (entry?.[0] as UserListDto['role']) ?? 'manager';
  }

  private fallbackPhone(): string {
    return `0${Date.now().toString().slice(-10)}`;
  }
}

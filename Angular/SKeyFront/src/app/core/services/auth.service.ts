import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignInRequest, RegisterRequest, AuthResponse } from '../../models/user.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = `${environment.apiUrl}/Users`;

  readonly token = signal<string | null>(localStorage.getItem('skey_token'));
  readonly isAuthenticated = signal(!!localStorage.getItem('skey_token'));

  signIn(credentials: SignInRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signin`, credentials)
      .pipe(tap((res) => this.persistSession(res.token)));
  }

  register(dto: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, dto)
      .pipe(tap((res) => this.persistSession(res.token)));
  }

  logout(): void {
    localStorage.removeItem('skey_token');
    this.token.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  private persistSession(token: string): void {
    localStorage.setItem('skey_token', token);
    this.token.set(token);
    this.isAuthenticated.set(true);
    this.router.navigate(['/users']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:2rem;font-family:'Tajawal',sans-serif;direction:rtl">
      <h1>لوحة التحكم</h1>
      <p>مرحباً بك في نظام Skey ERP</p>
      <button (click)="logout()" style="padding:0.5rem 1rem;margin-top:1rem;cursor:pointer">تسجيل الخروج</button>
    </div>
  `
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
  }
}

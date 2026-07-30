import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListDto } from '../../models/user.model';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  @Input() users: UserListDto[] = [];
  @Output() edit = new EventEmitter<UserListDto>();
  @Output() delete = new EventEmitter<UserListDto>();

  getRoleLabel(role: UserListDto['role']): string {
    const labels: Record<UserListDto['role'], string> = {
      admin: 'مدير نظام',
      accountant: 'محاسب',
      manager: 'مدير عمليات'
    };
    return labels[role] ?? role;
  }

  getAvatarClass(name: string): string {
    const classes = [
      'users-table__avatar--indigo',
      'users-table__avatar--green',
      'users-table__avatar--red',
      'users-table__avatar--yellow',
      'users-table__avatar--cyan',
      'users-table__avatar--purple',
      'users-table__avatar--rose'
    ];
    const index = name.charCodeAt(0) % classes.length;
    return classes[index];
  }

  getRoleClass(role: UserListDto['role']): string {
    if (role === 'admin') return 'users-table__role--admin';
    return 'users-table__role--default';
  }
}

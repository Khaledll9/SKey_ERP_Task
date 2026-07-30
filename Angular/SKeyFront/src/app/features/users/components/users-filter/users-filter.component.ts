import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFilterState } from '../../models/user-filter-state.model';
import { SkeyInputComponent } from '../../../../shared/ui/input/input';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeyInputComponent],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.css'
})
export class UsersFilterComponent {
  @Output() filterChange = new EventEmitter<Partial<UserFilterState>>();

  searchQuery = '';
  selectedRole?: UserFilterState['role'];
  selectedStatus?: UserFilterState['status'];

  showRoleDropdown = false;
  showStatusDropdown = false;

  roleOptions = [
    { label: 'مدير نظام', value: 'admin' as const },
    { label: 'محاسب', value: 'accountant' as const },
    { label: 'مدير عمليات', value: 'manager' as const },
  ];

  statusOptions = [
    { label: 'نشط', value: 'active' as const },
    { label: 'غير نشط', value: 'inactive' as const }
  ];

  getRoleLabel(role: string): string {
    return this.roleOptions.find(o => o.value === role)?.label ?? role;
  }

  toggleRoleDropdown() {
    this.showRoleDropdown = !this.showRoleDropdown;
    this.showStatusDropdown = false;
  }

  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showRoleDropdown = false;
  }

  updateQuery(query: string) {
    this.searchQuery = query;
    this.filterChange.emit({ query, page: 1 });
  }

  updateRole(role: UserFilterState['role'] | null) {
    this.selectedRole = role ?? undefined;
    this.showRoleDropdown = false;
    this.filterChange.emit({ role: role ?? undefined, page: 1 });
  }

  updateStatus(status: UserFilterState['status'] | null) {
    this.selectedStatus = status ?? undefined;
    this.showStatusDropdown = false;
    this.filterChange.emit({ status: status ?? undefined, page: 1 });
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('users-filter')) {
      this.showRoleDropdown = false;
      this.showStatusDropdown = false;
    }
  }
}

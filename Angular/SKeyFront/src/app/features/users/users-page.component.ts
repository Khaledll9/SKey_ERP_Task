import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersHeaderComponent } from './components/users-header/users-header.component';
import { UsersFilterComponent } from './components/users-filter/users-filter.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { SkeyPaginationComponent } from '../../shared/ui/pagination/pagination';
import { UsersService } from './services/users.service';
import { UserListDto } from './models/user.model';
import { UserFilterState } from './models/user-filter-state.model';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersHeaderComponent,
    UsersFilterComponent,
    UsersTableComponent,
    SkeyPaginationComponent,
    UserFormModalComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
  private usersService = inject(UsersService);

  allFilteredUsers = signal<UserListDto[]>([]);
  showUserModal = signal(false);
  modalMode = signal<'create' | 'edit'>('create');
  editingUser = signal<UserListDto | null>(null);
  userPendingDelete = signal<UserListDto | null>(null);
  deleteLoading = signal(false);

  private filterState = signal<UserFilterState>({
    query: '',
    page: 1,
    pageSize: 5
  });

  users = computed(() => {
    const page = this.filterState().page;
    const pageSize = this.filterState().pageSize;
    const startIndex = (page - 1) * pageSize;
    return this.allFilteredUsers().slice(startIndex, startIndex + pageSize);
  });

  get currentPage(): number {
    return this.filterState().page;
  }

  get pageSize(): number {
    return this.filterState().pageSize;
  }

  get totalUsers(): number {
    return this.allFilteredUsers().length;
  }

  constructor() {
    this.loadUsers();
  }

  openCreate() {
    this.modalMode.set('create');
    this.editingUser.set(null);
    this.showUserModal.set(true);
  }

  openEdit(user: UserListDto) {
    this.modalMode.set('edit');
    this.editingUser.set(user);
    this.showUserModal.set(true);
  }

  closeUserModal() {
    this.showUserModal.set(false);
    this.editingUser.set(null);
  }

  onUserSaved() {
    this.closeUserModal();
    this.loadUsers();
  }

  onFilterChange(change: Partial<UserFilterState>) {
    this.filterState.update((current) => ({ ...current, ...change }));
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.filterState.update((current) => ({ ...current, page }));
  }

  askDeleteUser(user: UserListDto) {
    this.userPendingDelete.set(user);
  }

  cancelDelete() {
    if (this.deleteLoading()) return;
    this.userPendingDelete.set(null);
  }

  confirmDelete() {
    const user = this.userPendingDelete();
    if (!user || this.deleteLoading()) return;

    this.deleteLoading.set(true);
    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        this.deleteLoading.set(false);
        this.userPendingDelete.set(null);
        this.loadUsers();
      },
      error: () => {
        this.deleteLoading.set(false);
      }
    });
  }

  private loadUsers() {
    this.usersService.getUsers(this.filterState()).subscribe((data) => {
      this.allFilteredUsers.set(data);
    });
  }
}

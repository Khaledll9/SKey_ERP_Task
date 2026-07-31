import { Component, OnInit, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserRequest, UpdateUserRequest, UserListDto } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { SkeyInputComponent } from '../../../../shared/ui/input/input';
import { SkeySelectComponent, SkeySelectOption } from '../../../../shared/ui/select/select';
import { SkeyButtonComponent } from '../../../../shared/ui/button/button';

@Component({
  selector: 'user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeyInputComponent,
    SkeySelectComponent,
    SkeyButtonComponent
  ],
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.css'
})
export class UserFormModalComponent implements OnInit {
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() user: UserListDto | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  userForm!: FormGroup;

  roleOptions: SkeySelectOption[] = [
    { label: 'مدير نظام', value: 'admin' },
    { label: 'محاسب', value: 'accountant' },
    { label: 'مدير عمليات', value: 'manager' },
  ];

  statusOptions: SkeySelectOption[] = [
    { label: 'نشط', value: 'active' },
    { label: 'غير نشط', value: 'inactive' }
  ];

  get title(): string {
    return this.mode === 'create' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم';
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['admin', Validators.required],
      status: ['active', Validators.required],
      mobile: ['']
    });

    if (this.mode === 'edit' && this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        status: this.user.status,
        mobile: ''
      });
    }
  }

  onClose() {
    if (this.loading()) return;
    this.closed.emit();
  }

  submit() {
    if (!this.userForm.valid || this.loading()) return;

    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    const formValue = this.userForm.getRawValue();

    if (this.mode === 'create') {
      const payload: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: 'Default@123',
        role: formValue.role,
        status: formValue.status,
        mobile: formValue.mobile
      };

      this.usersService.createUser(payload).subscribe({
        next: () => this.onSuccess('تمت إضافة المستخدم بنجاح'),
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(err?.error?.message || 'فشل حفظ المستخدم');
        }
      });
      return;
    }

    const payload: UpdateUserRequest = {
      id: this.user!.id,
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
      status: formValue.status,
      mobile: formValue.mobile
    };

    this.usersService.updateUser(payload).subscribe({
      next: () => this.onSuccess('تم تحديث بيانات المستخدم بنجاح'),
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'فشل حفظ المستخدم');
      }
    });
  }

  private onSuccess(msg: string): void {
    this.loading.set(false);
    this.successMessage.set(msg);
    setTimeout(() => {
      this.saved.emit();
    }, 1200);
  }
}

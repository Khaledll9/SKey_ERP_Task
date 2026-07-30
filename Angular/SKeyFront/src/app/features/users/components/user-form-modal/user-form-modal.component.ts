import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
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

  loading = false;
  errorMessage: string | null = null;
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
      mobile: [''],
      department: ['']
    });

    if (this.mode === 'edit' && this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        status: this.user.status,
        mobile: '',
        department: ''
      });
    }
  }

  onClose() {
    if (this.loading) return;
    this.closed.emit();
  }

  submit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const formValue = this.userForm.getRawValue();

    if (this.mode === 'create') {
      const payload: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: 'Default@123',
        role: formValue.role,
        status: formValue.status,
        mobile: formValue.mobile,
        department: formValue.department,
        tenantId: 'default'
      };

      this.usersService.createUser(payload).subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.error?.message || 'فشل حفظ المستخدم';
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
      mobile: formValue.mobile,
      department: formValue.department
    };

    this.usersService.updateUser(payload).subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'فشل حفظ المستخدم';
      }
    });
  }
}

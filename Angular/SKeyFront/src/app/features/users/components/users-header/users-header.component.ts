import { Component, EventEmitter, Output } from '@angular/core';
import { SkeyButtonComponent } from '../../../../shared/ui/button/button';

@Component({
  selector: 'users-header',
  standalone: true,
  imports: [SkeyButtonComponent],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.css'
})
export class UsersHeaderComponent {
  @Output() openCreate = new EventEmitter<void>();
}

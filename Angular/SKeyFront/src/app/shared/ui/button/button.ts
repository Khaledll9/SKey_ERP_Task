import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'skey-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class SkeyButtonComponent {
  private router = inject(Router);

  @Input() variant:
    | 'primary'
    | 'default'
    | 'dashed'
    | 'danger'
    | 'link'
    | 'success'
    | 'cta-primary'
    | 'cta-secondary' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() block = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() link?: string;

  get variantClasses(): string {
    const sizeClass = `skey-btn--${this.size}`;
    const variantClass = `skey-btn--${this.variant}`;
    return `skey-btn ${sizeClass} ${variantClass}${this.block ? ' skey-btn--block' : ''}`;
  }

  onClick(event: Event) {
    if (this.disabled || this.loading || !this.link) return;
    event.preventDefault();
    void this.router.navigateByUrl(this.link);
  }
}

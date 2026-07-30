import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'skey-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkeyInputComponent),
      multi: true
    }
  ]
})
export class SkeyInputComponent implements ControlValueAccessor {
  private sanitizer = inject(DomSanitizer);

  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() value: string | number = '';
  @Input() disabled = false;
  @Input() helpText?: string;

  private _iconRight?: string;
  safeIconRight?: SafeHtml;

  @Input() set iconRight(val: string | undefined) {
    this._iconRight = val;
    this.safeIconRight = val ? this.sanitizer.bypassSecurityTrustHtml(val) : undefined;
  }
  get iconRight(): string | undefined {
    return this._iconRight;
  }

  @Output() valueChange = new EventEmitter<string | number>();

  isPasswordVisible = false;

  onChange: (value: unknown) => void = () => {};
  onTouched: () => void = () => {};

  get hasRightIcon(): boolean {
    return !!this._iconRight;
  }
  get hasLeftToggle(): boolean {
    return this.type === 'password';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  writeValue(value: unknown): void {
    this.value = (value as string | number) ?? '';
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputModelChange(val: string | number): void {
    this.value = val;
    this.valueChange.emit(val);
    this.onChange(val);
  }
}

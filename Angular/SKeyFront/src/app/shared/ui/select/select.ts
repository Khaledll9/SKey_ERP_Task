import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SkeySelectOption {
  label: string;
  value: string;
}

@Component({
  standalone: true,
  selector: 'skey-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkeySelectComponent),
      multi: true
    }
  ]
})
export class SkeySelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() options: SkeySelectOption[] = [];
  @Input() disabled = false;

  value = '';

  onChange: (value: unknown) => void = () => {};
  onTouched: () => void = () => {};

  onModelChange(val: string) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.value = (value as string) ?? '';
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
}

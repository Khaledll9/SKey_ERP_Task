import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  template: `
    <div style="max-width:80rem;margin:0 auto;padding:2rem 1.5rem;text-align:right" dir="rtl">
      <h1 style="margin:0;font-size:26px;font-weight:900;color:#0f2963">المخزون</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {}

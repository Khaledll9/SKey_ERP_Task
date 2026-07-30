import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skey-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class SkeyCardComponent {
  @Input() title?: string;
  @Input() bordered = false;
  @Input() hoverable = true;
}

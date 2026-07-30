import { Component, Input, booleanAttribute, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SkeyButtonComponent } from '../../shared/ui/button/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeyButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  private sanitizer = inject(DomSanitizer);

  @Input({ transform: booleanAttribute }) embedded = false;

  constructor() {}
}

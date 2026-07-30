import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SkeyInputComponent } from '../../shared/ui/input/input';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SkeyInputComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}

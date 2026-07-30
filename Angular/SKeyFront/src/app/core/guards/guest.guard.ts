import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanMatchFn = () => {
  const auth = inject(AuthService);

  if (auth.isAuthenticated()) {
    return false;
  }

  return true;
};

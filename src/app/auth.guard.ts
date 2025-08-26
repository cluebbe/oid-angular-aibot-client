import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  if (authService.isLoggedIn()) {
    return true; // Allow access if authenticated and no specific role is required
  } else {
    window.alert( 'You must be logged in to access this page.');
    router.navigate(['/home']);
    return false; // Deny access
  }
};

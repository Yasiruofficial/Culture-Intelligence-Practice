import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.loggedUser) return router.createUrlTree(['/member']);

  return true;
};

import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateChildFn = (
  route,
  state
): boolean | UrlTree => {
  const router: Router = inject(Router);

  const privateRoutes: string[] = ['/', '/add'];
  const loggedUser = localStorage.getItem('LOGGED_USER');

  const isPrivateRoute = privateRoutes.some((path) => state.url == path);

  if (!loggedUser && isPrivateRoute) {
    console.log('Unauthorized access attempt. Redirecting to login.');
    return router.createUrlTree(['/auth/login']);
  } else if (loggedUser && state.url === '/auth/login') {
    console.log('Already logged in. Redirecting to dashboard.');
    return router.createUrlTree(['/']);
  } else {
    return true;
  }
};

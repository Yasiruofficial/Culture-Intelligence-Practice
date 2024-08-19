import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateChildFn = (
  _route,
  state
): boolean | UrlTree => {
  const router: Router = inject(Router);

  const publicRoutes: string[] = ['/auth/login', '/auth/register'];

  const loggedUser = localStorage.getItem('LOGGED_USER');

  const isPublicRoute = publicRoutes.some((path) => state.url.startsWith(path));

  if (!loggedUser && !isPublicRoute) {
    console.log('Unauthorized access attempt. Redirecting to login.');
    return router.createUrlTree(['/auth/login']);
  } else if (
    loggedUser &&
    (state.url === '/auth/login' || state.url === '/auth/register')
  ) {
    console.log('Already logged in. Redirecting to dashboard.');
    return router.createUrlTree([`/members`]);
  } else {
    return true;
  }
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { isAuth } from 'src/app/shared/functions';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (isAuth()) {
    return true;
  }
  return router.navigate(['welcome']);
};

export function isAuthenticated(authPath: boolean): CanActivateFn {
  return () => {
    const router = inject(Router);
    if (authPath) {
      if (isAuth()) {
        return true;
      }
      return router.navigate(['welcome']);
    } else {
      if (isAuth()) {
        return router.navigate(['quiz']);
      }
      return true;
    }
  }
};



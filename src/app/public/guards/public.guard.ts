import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { isAuth } from 'src/app/shared/functions';

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (isAuth()) {
    return router.navigate(['quiz']);
  }
  return true;
};
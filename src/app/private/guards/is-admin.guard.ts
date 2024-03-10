import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserRole } from '../enums';

export const isAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  if (currentUser?.role === UserRole.admin) {
    return true;
  }
  return router.navigate(['/quiz']);
};

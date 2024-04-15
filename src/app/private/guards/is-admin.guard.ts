import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { UserRole } from '../enums';
import { userFeature } from 'src/app/store/features';

export const isAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const currentUser = store.selectSignal(userFeature.selectCurrentUser);
  if (currentUser()?.role === UserRole.admin) {
    return true;
  }
  return router.navigate(['/quiz']);
};

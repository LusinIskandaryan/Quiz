import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as UserEffects from 'src/app/store/effects/user-effects/user.effects';
import { userFeature } from 'src/app/store/features';

const userList = () => import('../index').then((m) => m.UserListComponent);
const userDetail = () => import('../index').then((m) => m.UserDetailComponent);

export const userRoutes: Routes = [

  { path: 'list', loadComponent: userList },
  {
    path: ':userId',
    loadComponent: userDetail,
    providers: [
      provideEffects([
        UserEffects,
      ]),
      provideState(userFeature)
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];

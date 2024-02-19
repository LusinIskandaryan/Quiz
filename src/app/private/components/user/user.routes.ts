import { Routes } from '@angular/router';

const userList = () =>  import('../index').then((m) => m.UserListComponent);
const userDetail = () => import('../index').then((m) => m.UserDetailComponent);

export const userRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  { path: 'list', loadComponent: userList },
  { path: ':userId', loadComponent: userDetail },
];

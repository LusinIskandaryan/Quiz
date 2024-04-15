import { Routes } from '@angular/router';

import { isAuthenticated } from './core/auth/guards';


const publicRoutes = () => import('./public/public.routes').then((m) => m.publicRoutes);
const privateRoutes = () => import('./private/private.routes').then((m) => m.privateRoutes);

export const routes: Routes = [
  {
    path: '',
    loadChildren: publicRoutes,
    canActivate: [ isAuthenticated(false) ],
  },
  {
    path: '',
    loadChildren: privateRoutes,
    canActivate: [ isAuthenticated(true) ],
  }
];

import { Routes } from '@angular/router';

import { PublicComponent } from './public.component';

const signUp = () => import('./components/index').then((m) => m.SignUpComponent);
const signIn = () => import('./components/index').then((m) => m.SignInComponent);
const welcome = () => import('./components/index').then((m) => m.WelcomeComponent);

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      { path: 'welcome', loadComponent: welcome },
      { path: 'register', loadComponent: signUp },
      { path: 'login', loadComponent: signIn },
    ],
  },
];

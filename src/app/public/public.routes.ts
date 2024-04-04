import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as LoginEffects from 'src/app/store/effects/auth.effects';
import { PublicComponent } from './public.component';
import { loginFeature } from '../store/features/auth.features';

const signUp = () =>
  import('./components/index').then((m) => m.SignUpComponent);
const signIn = () =>
  import('./components/index').then((m) => m.SignInComponent);
const welcome = () =>
  import('./components/index').then((m) => m.WelcomeComponent);

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'welcome', loadComponent: welcome },
      { path: 'register', loadComponent: signUp },
      { path: 'login', loadComponent: signIn },
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    ],
    providers: [
      provideEffects([LoginEffects]),
      provideState(loginFeature),
    ],
  },
];

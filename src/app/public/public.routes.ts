import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as RegisterEffects from 'src/app/store/effects/register.effects';

import { PublicComponent } from './public.component';
import { registerFeature } from '../store/features';

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
    providers: [
      provideEffects([
        RegisterEffects
    ]),
      provideState(registerFeature),
    ]
  },
];

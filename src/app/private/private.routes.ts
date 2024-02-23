import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as AppEffects from 'src/app/store/effects/app.effects';
import * as UserEffects from 'src/app/store/effects/user.effects';
import * as QuizEffects from 'src/app/store/effects/user.effects';

import { PrivateComponent } from './private.component';
import { appFeature, userFeature, quizFeature } from '../store/features';

const quizRoutes = () => import('./components/quiz/quiz.routes').then((m) => m.quizRoutes);
const userRoutes = () => import('./components/user/user.routes').then((m) => m.userRoutes);
const summary = () => import('./components/index').then((m) => m.SummaryComponent);

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: 'quiz', loadChildren: quizRoutes },
      { path: 'user', loadChildren: userRoutes },
      { path: 'summary', loadComponent: summary },
    ],
    providers: [
      provideEffects([
        AppEffects,
        UserEffects,
        QuizEffects
    ]),
      provideState(appFeature),
      provideState(userFeature),
      provideState(quizFeature),
    ]
  },
];

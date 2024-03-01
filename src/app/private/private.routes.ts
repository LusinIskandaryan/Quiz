import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as UserEffects from 'src/app/store/effects/user.effects';
import * as QuizEffects from 'src/app/store/effects/quiz.effects';
import { PrivateComponent } from './private.component';
import { userFeature, quizFeature } from '../store/features';
import { isAdminGuard } from './guards';

const quizRoutes = () =>
  import('./components/quiz/quiz.routes').then((m) => m.quizRoutes);
const userRoutes = () =>
  import('./components/user/user.routes').then((m) => m.userRoutes);

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/quiz' },
      { path: 'quiz', loadChildren: quizRoutes },
      {
        path: 'user',
        loadChildren: userRoutes,
        canMatch: [ isAdminGuard ]
      },
    ],
    providers: [
      provideEffects([UserEffects, QuizEffects]),
      provideState(userFeature),
      provideState(quizFeature),
    ],
  },
];

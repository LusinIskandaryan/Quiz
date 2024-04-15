import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as QuizEffects from 'src/app/store/effects/quiz/quiz.effects';
import * as PassQuizEffects from 'src/app/store/effects/quiz/pass-quiz.effects';
import { PrivateComponent } from './private.component';
import {
  quizFeature,
  passQuizFeature,
} from '../store/features';
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
      {
        path: 'user',
        loadChildren: userRoutes,
        canActivateChild: [isAdminGuard],
      },
      {
        path: 'quiz',
        loadChildren: quizRoutes,
      },
    ],
    providers: [
      provideEffects([
        QuizEffects,
        PassQuizEffects,
      ]),
      provideState(quizFeature),
      provideState(passQuizFeature),
    ],
  },
];

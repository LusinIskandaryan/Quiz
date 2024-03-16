import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import * as UserListEffects from 'src/app/store/effects/user-list.effects';
import * as QuizEffects from 'src/app/store/effects/quiz.effects';
import * as QuizListEffects from 'src/app/store/effects/quiz-list.effects';
import * as PassQuizEffects from 'src/app/store/effects/pass-quiz.effects';
import * as LookupsEffects from 'src/app/store/effects/lookups.effects';
import { PrivateComponent } from './private.component';
import {
  quizFeature,
  userListFeature,
  quizListFeature,
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
        UserListEffects,
        QuizEffects,
        QuizListEffects,
        PassQuizEffects,
        LookupsEffects
      ]),
      provideState(userListFeature),
      provideState(quizFeature),
      provideState(quizListFeature),
      provideState(passQuizFeature),
    ],
  },
];

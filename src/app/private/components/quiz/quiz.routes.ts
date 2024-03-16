import { Routes } from '@angular/router';

import { isAdminGuard } from 'src/app/private/guards';

const quizList = () => import('../index').then((m) => m.QuizListComponent);
const quiz = () => import('../index').then((m) => m.QuizDetailComponent);
const startQuiz = () => import('../index').then((m) => m.QuizDetailComponent);
const result = () => import('../index').then((m) => m.ResultComponent);

export const quizRoutes: Routes = [
  { path: 'list', loadComponent: quizList },
  { path: 'start/:quizId', loadComponent: startQuiz },
  { path: 'create', loadComponent: quiz, canMatch: [isAdminGuard] },
  { path: 'result/:quizId', loadComponent: result },
  { path: ':quizId', loadComponent: quiz, canMatch: [isAdminGuard] },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];

import { Routes } from '@angular/router';

import { isAdminGuard, unsavedChangesGuard } from 'src/app/private/guards';

const quizList = () => import('../index').then((m) => m.QuizListComponent);
const quiz = () => import('../index').then((m) => m.QuizComponent);
const startQuiz = () => import('../index').then((m) => m.QuizComponent);
const result = () => import('../index').then((m) => m.ResultComponent);

export const quizRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  { path: 'list', loadComponent: quizList },
  { path: 'start/:quizId', loadComponent: startQuiz },
  { path: 'create', loadComponent: quiz, canMatch: [isAdminGuard], canDeactivate: [unsavedChangesGuard] },
  { path: 'result/:quizId', loadComponent: result },
  { path: ':quizId', loadComponent: quiz, canMatch: [isAdminGuard], canDeactivate: [unsavedChangesGuard] },
];

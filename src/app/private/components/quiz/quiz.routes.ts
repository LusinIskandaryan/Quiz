import { Routes } from '@angular/router';

import { isAdminGuard, unsavedChangesGuard } from 'src/app/private/guards';

const quizList = () => import('../index').then((m) => m.QuizListComponent);
const createQuiz = () => import('../index').then((m) => m.CreateQuizComponent);
const startQuiz = () => import('../index').then((m) => m.StartQuizComponent);
const result = () => import('../index').then((m) => m.ResultComponent);

export const quizRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  { path: 'list', loadComponent: quizList },
  { path: 'create', loadComponent: createQuiz, canMatch: [isAdminGuard], canDeactivate: [unsavedChangesGuard] },
  { path: ':quizId', loadComponent: createQuiz, canMatch: [isAdminGuard], canDeactivate: [unsavedChangesGuard] },
  { path: 'start/:quizId', loadComponent: startQuiz },
  { path: 'result/:quizId', loadComponent: result },
];

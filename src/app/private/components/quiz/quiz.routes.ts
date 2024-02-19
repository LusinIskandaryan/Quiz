import { Routes } from '@angular/router';

const quizList = () => import('../index').then((m) => m.QuizListComponent);
const createQuiz = () => import('../index').then((m) => m.CreateQuizComponent);
const startQuiz = () => import('../index').then((m) => m.StartQuizComponent);

export const quizRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  { path: 'list', loadComponent: quizList },
  { path: 'create', loadComponent: createQuiz },
  { path: 'start', loadComponent: startQuiz },
];

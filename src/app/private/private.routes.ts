import { Routes } from '@angular/router';

import { PrivateComponent } from './private.component';

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
  },
];

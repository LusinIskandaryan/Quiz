import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserRole } from 'src/app/private/enums';
import { QuizService } from 'src/app/private/services';
import { QuizListActions } from '../../actions';
import { appFeature } from '../../features';

export const getQuizList$ = createEffect(
  (
    actions = inject(Actions),
    store = inject(Store),
    service = inject(QuizService)
  ) => {
    return actions.pipe(
      ofType(QuizListActions.getQuizList),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
        service.getQuizList().pipe(
          map((res) => {
            if (currentUser?.role === UserRole.user) {
              res = res.filter((quiz) => currentUser.quizIds.includes(quiz.id));
            }
            const resData = new HttpResponseSuccessModel(res, '');
            return QuizListActions.getQuizListSuccess(resData);
          }),
          catchError((error) => of(QuizListActions.getQuizListError({ error })))
        )
      )
    );
  },
  { functional: true }
);

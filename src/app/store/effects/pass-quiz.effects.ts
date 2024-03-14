import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  catchError,
  exhaustMap,
  map,
  of,
  tap,
} from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { QuizService } from 'src/app/private/services';
import { PassQuizActions } from '../actions';
import { quizFeature } from '../features/quiz.features';

export const passQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(PassQuizActions.passQuiz),
      exhaustMap(({ data }) =>
        service.passQuiz(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(
              true,
              'Quiz is successfully pased.'
            );
            return PassQuizActions.passQuizSuccess(resData)
          }),
          catchError((error) => of(PassQuizActions.passQuizError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const passQuizSuccess$ = createEffect(
  (
    actions = inject(Actions),
    router = inject(Router),
    store = inject(Store)
  ) => {
    return actions.pipe(
      ofType(PassQuizActions.passQuizSuccess),
      concatLatestFrom(() => store.select(quizFeature.selectQuizId)),
      tap(([, quizId]) => {
        router.navigate([`/quiz/result/${quizId}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);
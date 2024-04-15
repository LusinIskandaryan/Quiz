import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  catchError,
  exhaustMap,
  filter,
  interval,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserRole } from 'src/app/private/enums';
import { QuizService } from 'src/app/private/services';
import { PassQuizActions, QuizActions } from '../../actions';
import { quizFeature } from '../../features/quiz/quiz.feature';
import { userFeature } from '../../features';

export const getQuizList$ = createEffect(
  (
    actions = inject(Actions),
    store = inject(Store),
    quizService = inject(QuizService)
  ) => {
    return actions.pipe(
      ofType(QuizActions.getQuizList),
      concatLatestFrom(() => store.select(userFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
      quizService.getQuizList().pipe(
          map((res) => {
            if (currentUser?.role === UserRole.user) {
              res = res.filter((quiz) => currentUser.quizIds.includes(quiz.id));
            }
            const resData = new HttpResponseSuccessModel(res, '');
            return QuizActions.getQuizListSuccess(resData);
          }),
          catchError((error) => of(QuizActions.getQuizListError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getQuiz$ = createEffect(
  (actions = inject(Actions), quizService = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.getQuiz),
      switchMap(({ quizId }) =>
      quizService.getQuiz(quizId).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return QuizActions.getQuizSuccess(resData);
          }),
          catchError((error) => of(QuizActions.getQuizError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getQuizSuccess$ = createEffect(
  (actions = inject(Actions), state = inject(Store)) => {
    return actions.pipe(
      ofType(QuizActions.getQuizSuccess),
      concatLatestFrom(() => state.select(userFeature.selectCurrentUser)),
      filter(([, currentUser]) => currentUser?.role === UserRole.user),
      map(() => QuizActions.startTimer())
    );
  },
  { functional: true }
);

export const deleteQuiz$ = createEffect(
  (actions = inject(Actions), quizService = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.deleteQuiz),
      exhaustMap(({ quizId }) =>
      quizService.deleteQuiz(quizId).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(
              res,
              'Quiz is successfully deleted.'
            );
            return QuizActions.deleteQuizSuccess(resData);
          }),
          catchError((error) => of(QuizActions.deleteQuizError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteQuizSuccess$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(QuizActions.deleteQuizSuccess),
      map(() => QuizActions.getQuizList())
    );
  },
  { functional: true }
);

export const createQuiz$ = createEffect(
  (actions = inject(Actions), quizService = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.createQuiz),
      exhaustMap(({ data }) =>
      quizService.createQuiz(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(
              res,
              'Quiz is successfully created.'
            );
            return QuizActions.createQuizSuccess(resData);
          }),
          catchError((error) => of(QuizActions.createQuizError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const createQuizSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(QuizActions.createQuizSuccess),
      tap(() => {
        router.navigate([`/quiz/list`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const updateQuiz$ = createEffect(
  (actions = inject(Actions), quizService = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.updateQuiz),
      exhaustMap(({ data }) =>
      quizService.updateQuiz(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(
              res,
              'Quiz is successfully updated.'
            );
            return QuizActions.updateQuizSuccess(resData);
          }),
          catchError((error) => of(QuizActions.updateQuizError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateQuizSuccess$ = createEffect(
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(QuizActions.updateQuizSuccess),
      concatLatestFrom(() => store.select(quizFeature.selectQuizId)),
      map(([, quizId]) => QuizActions.getQuiz({ quizId }))
    );
  },
  { functional: true }
);

export const startTimer$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(QuizActions.startTimer),
      switchMap(() =>
        interval(1000).pipe(
          map(() => QuizActions.tick()),
          takeUntil(actions.pipe(ofType(QuizActions.stopTimer)))
        )
      )
    );
  },
  { functional: true }
);

export const stopTimer$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(PassQuizActions.passQuizError, PassQuizActions.passQuizSuccess),
      map(() => QuizActions.stopTimer())
    );
  },
  { functional: true }
);

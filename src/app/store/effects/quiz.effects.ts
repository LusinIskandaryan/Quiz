import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserRole } from 'src/app/private/enums';
import { QuizService } from 'src/app/private/services';
import { QuizActions } from '../actions';
import { quizFeature } from '../features/quiz.features';
import { appFeature } from '../features';

export const getQuizList$ = createEffect(
  (
    actions = inject(Actions),
    store = inject(Store),
    service = inject(QuizService)
  ) => {
    return actions.pipe(
      ofType(QuizActions.getQuizList),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
        service.getQuizList().pipe(
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
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.getQuiz),
      switchMap(({ quizId }) =>
        service.getQuiz(quizId).pipe(
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

export const deleteQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.deleteQuiz),
      exhaustMap(({ quizId }) =>
        service.deleteQuiz(quizId).pipe(
          map(() => {
            const resData = new HttpResponseSuccessModel(true, 'Quiz is successfully deleted.');
            return QuizActions.deleteQuizSuccess(resData)
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

export const updateQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.updateQuiz),
      switchMap(({ data }) =>
        service.updateQuiz(data).pipe(
          map((res) => QuizActions.updateQuizSuccess(res)),
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

export const createQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.createQuiz),
      exhaustMap(({ data }) =>
        service.createQuiz(data).pipe(
          map((res) => QuizActions.createQuizSuccess(res)),
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

export const passQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.passQuiz),
      exhaustMap(({ data }) =>
        service.passQuiz(data).pipe(
          map((res) => QuizActions.passQuizSuccess(res)),
          catchError((error) => of(QuizActions.passQuizError({ error })))
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
      ofType(QuizActions.passQuizSuccess),
      concatLatestFrom(() => store.select(quizFeature.selectQuizId)),
      tap(([, quizId]) => {
        router.navigate([`/quiz/result/${quizId}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

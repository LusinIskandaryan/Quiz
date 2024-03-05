import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import { QuizService } from 'src/app/private/services';
import { UserRole } from 'src/app/private/enums';
import { QuizActions } from '../actions';
import { quizFeature } from '../features/quiz.features';
import { appFeature } from '../features';

export const initializePage$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(QuizActions.initializePage, QuizActions.applyPagination),
      map(() => QuizActions.getQuizList()
      )
    );
  },
  { functional: true }
);

export const getQuizList$ = createEffect(
  (actions = inject(Actions), store = inject(Store), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.getQuizList),
      concatLatestFrom(() => [store.select(quizFeature.selectPaginationData), store.select(appFeature.selectCurrentUser)]),
      switchMap(([ , paginationData, currentUser]) =>
        service.getQuizList(paginationData).pipe(
          map((res) => {
            if (currentUser?.role === UserRole.user) {
              const items = res.data.items.filter(quiz => currentUser.quizIds.includes(quiz.id));
              const data = {...res.data, items};
              return QuizActions.getQuizListSuccess({...res, data})
            }
            return QuizActions.getQuizListSuccess(res)}),
          catchError((error) => of(QuizActions.getQuizListError({ error })))
        )
      )
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

export const getQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.getQuiz),
      switchMap(({ quizId }) =>
        service.getQuiz(quizId).pipe(
          map((res) => QuizActions.getQuizSuccess(res)),
          catchError((error) => of(QuizActions.getQuizError({ error })))
        )
      )
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

export const deleteQuiz$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(QuizActions.deleteQuiz),
      exhaustMap(({ quizId }) =>
        service.deleteQuiz(quizId).pipe(
          map((res) => QuizActions.deleteQuizSuccess(res)),
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
  (actions = inject(Actions), router = inject(Router), store = inject(Store)) => {
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

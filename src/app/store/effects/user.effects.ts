import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap } from 'rxjs';

import { QuizService, UserService } from 'src/app/private/services';
import { UserActions } from '../actions';
import { appFeature, userFeature } from '../features';

export const getUserList$ = createEffect(
  (store = inject(Store), actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.getUserList),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
        service.getUserList().pipe(
          map((res) => {
            const data = res.data.filter(user => user.id !== currentUser?.id);
            return UserActions.getUserListSuccess({...res, data})}),
          catchError((error) => of(UserActions.getUserListError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const initUser$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(UserActions.userInit),
      map(({ userId }) => UserActions.getUser({userId})
      )
    );
  },
  { functional: true }
);

export const getUser$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.getUser),
      switchMap(({ userId }) =>
        service.getUser(userId).pipe(
          map((res) => UserActions.getUserSuccess(res)),
          catchError((error) => of(UserActions.getUserError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getUserSuccess$ = createEffect(
  (actions = inject(Actions), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(UserActions.getUserSuccess),
      switchMap(({data}) =>
      service.getQuizList().pipe(
        map((res) => {
          const quizList = res.data.filter(quiz => data.quizIds.includes(quiz.id));
          return UserActions.getQuizListSuccess({...res, data: quizList});
        }),
        catchError((error) => of(UserActions.getQuizListError({ error })))
      ))
    );
  },
  { functional: true }
);

export const getLookUps$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(UserActions.getUserSuccess),
      map(() => UserActions.getLookups())
    );
  },
  { functional: true }
);

export const getLookupsSuccess$ = createEffect(
  (actions = inject(Actions), store = inject(Store), service = inject(QuizService)) => {
    return actions.pipe(
      ofType(UserActions.getLookups),
      concatLatestFrom(() => store.select(userFeature.selectUser)),
      switchMap(([ ,user]) =>
        service.getQuizLookups().pipe(
          map((res) => {
            const data = res.data.filter(item => !user?.quizIds.includes(`${item.id}`));
            console.log(user, res, data);
            return UserActions.getLookupsSuccess({...res, data})
          }),
          catchError((error) => of(UserActions.getLookupsError({ error })))
        )
      )
    );
  },
  { functional: true }
);


export const updateUser$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ data }) =>
        service.updateUser(data).pipe(
          map((res) => UserActions.updateUserSuccess(res)),
          catchError((error) => of(UserActions.updateUserError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateUserSuccess$ = createEffect(
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(UserActions.updateUserSuccess),
      concatLatestFrom(() => store.select(userFeature.selectUserId)),
      map(([, userId]) => UserActions.userInit({ userId }))
    );
  },
  { functional: true }
);

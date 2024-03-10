import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap } from 'rxjs';

import { QuizService, UserService } from 'src/app/private/services';
import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserActions } from '../actions';
import { appFeature, userFeature } from '../features';

export const getUserList$ = createEffect(
  (
    store = inject(Store),
    actions = inject(Actions),
    service = inject(UserService)
  ) => {
    return actions.pipe(
      ofType(UserActions.getUserList),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
        service.getUserList(currentUser!.id).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return UserActions.getUserListSuccess(resData);
          }),
          catchError((error) => of(UserActions.getUserListError({ error })))
        )
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
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return UserActions.getUserSuccess(resData);
          }),
          catchError((error) => of(UserActions.getUserError({ error })))
        )
      )
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
  (
    actions = inject(Actions),
    service = inject(QuizService)
  ) => {
    return actions.pipe(
      ofType(UserActions.getLookups),
      switchMap(() =>
        service.getQuizLookups().pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return UserActions.getLookupsSuccess(resData);
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
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, 'User successfully updated');
            return UserActions.updateUserSuccess(resData)
          }),
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
      map(([, userId]) => UserActions.getUser({ userId }))
    );
  },
  { functional: true }
);

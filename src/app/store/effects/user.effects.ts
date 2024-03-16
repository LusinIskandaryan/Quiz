import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { LookupsService, UserService } from 'src/app/private/services';
import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { LookupsActions, UserActions } from '../actions';
import { userFeature } from '../features';

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
      map(() => LookupsActions.getQuizLookups())
    );
  },
  { functional: true }
);

export const getLookupsSuccess$ = createEffect(
  (actions = inject(Actions), service = inject(LookupsService)) => {
    return actions.pipe(
      ofType(LookupsActions.getQuizLookups),
      switchMap(() =>
        service.getQuizLookups().pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return LookupsActions.getQuizLookupsSuccess(resData);
          }),
          catchError((error) => of(LookupsActions.getQuizLookupsError({ error })))
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
      exhaustMap(({ data }) =>
        service.updateUser(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(
              res,
              'User successfully updated'
            );
            return UserActions.updateUserSuccess(resData);
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

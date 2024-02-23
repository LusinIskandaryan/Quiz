import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap } from 'rxjs';

import { UserService } from 'src/app/private/services';
import { UserActions } from '../actions';
import { userFeature } from '../features';

export const getUserList$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.getUserList),
      switchMap(() =>
        service.getUserList().pipe(
          map((res) => UserActions.getUserListSuccess(res)),
          catchError((error) => of(UserActions.getUserListError({ error })))
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
      map(([ , userId]) => UserActions.getUser({ userId }))
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

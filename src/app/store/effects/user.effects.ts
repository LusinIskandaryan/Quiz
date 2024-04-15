import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import { UserService } from 'src/app/private/services';
import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserActions } from '../actions';
import { userFeature } from '../features';

export const getUserList$ = createEffect(
  (
    store = inject(Store),
    actions = inject(Actions),
    userService = inject(UserService)
  ) => {
    return actions.pipe(
      ofType(UserActions.getUserList),
      concatLatestFrom(() => store.select(userFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
      userService.getUserList(currentUser!.id).pipe(
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

export const getCurrentUser$ = createEffect(
  (actions = inject(Actions), userService = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.getCurrentUser),
      switchMap(({ id }) =>
      userService.getCurrentUser(id).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return UserActions.getCurrentUserSuccess(resData);
          }),
          catchError((error) => of(UserActions.getCurrentUserError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getCurrentUserSuccess$ = createEffect(
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(UserActions.getCurrentUserSuccess),
      concatLatestFrom(() => store.select(userFeature.selectCurrentUser)),
      tap(([, currentUser]) => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCurrentUserError$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(UserActions.getCurrentUserError),
      tap(() => {
        localStorage.clear();
      })
    );
  },
  { functional: true, dispatch: false }
);


export const getUser$ = createEffect(
  (actions = inject(Actions), userService = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.getUser),
      switchMap(({ userId }) =>
      userService.getUser(userId).pipe(
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

export const updateUser$ = createEffect(
  (actions = inject(Actions), userService = inject(UserService)) => {
    return actions.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ data }) =>
      userService.updateUser(data).pipe(
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

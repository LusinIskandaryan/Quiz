import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthService } from 'src/app/public/services';
import { AuthActions } from '../actions/auth.actions';
import { AppActions } from '../actions';

export const login$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ data }) =>
        service.login(data).pipe(
          map((res) => AuthActions.loginSuccess(res)),
          catchError((error) => of(AuthActions.loginError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccess$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AppActions.aplicationInit())
    );
  },
  { functional: true }
);

export const setCurrentUser$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        router.navigate([`/quiz`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logout$ = createEffect(
  (actions = inject(Actions), service = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        service.logout().pipe(
          map((res) => AuthActions.logoutSuccess(res)),
          catchError((error) => of(AuthActions.logoutError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const logoutSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        router.navigate([`/welcome`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

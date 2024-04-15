import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth';
import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { AuthActions } from '../actions/auth.actions';
import { UserActions } from '../actions';

export const login$ = createEffect(
  (actions = inject(Actions), authService = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ data }) =>
      authService.login(data).pipe(
          map((res) => {
            if (res?.[0]) {
              const resData = new HttpResponseSuccessModel(
                res[0],
                'You are successfully logIn'
              );
              return AuthActions.loginSuccess(resData);
            }
            const errData = { message: 'Username or password are incorrect' };
            return AuthActions.loginError(
              new HttpErrorResponse({ error: errData })
            );
          }),
          catchError((error) => of(AuthActions.loginError(error)))
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
      map(({ data }) => {
        localStorage.setItem('currentUserId', data.id);
        return UserActions.getCurrentUser({id: data.id});
      })
    );
  },
  { functional: true }
);

export const loginSuccessNavigation$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        router.navigate(['/quiz']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logout$ = createEffect(
  (actions = inject(Actions), authService = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
      authService.logout().pipe(
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
        localStorage.clear();
        router.navigate([`/welcome`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const registerUser$ = createEffect(
  (actions = inject(Actions), authService = inject(AuthService)) => {
    return actions.pipe(
      ofType(AuthActions.registerUser),
      exhaustMap(({ data }) =>
      authService.registerUser(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, 'You are successfully registered');
            return AuthActions.registerUserSuccess(resData)
          }),
          catchError((error) =>
            of(AuthActions.registerUserError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const registerUserSuccess$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(AuthActions.registerUserSuccess),
      tap(() => {
        router.navigate([`/login`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

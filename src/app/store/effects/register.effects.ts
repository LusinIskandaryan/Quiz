import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, exhaustMap, map, of, tap } from "rxjs";

import { RegisterService } from "src/app/public/services";
import { HttpResponseSuccessModel } from "src/app/shared/models";
import { RegisterActions } from "../actions";

export const registerUser$ = createEffect(
  (actions = inject(Actions), service = inject(RegisterService)) => {
    return actions.pipe(
      ofType(RegisterActions.registerUser),
      exhaustMap(({ data }) =>
      service.registerUser(data).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, 'You are successfully registered');
            return RegisterActions.registerUserSuccess(resData)
          }),
          catchError((error) =>
            of(RegisterActions.registerUserError({ error }))
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
      ofType(RegisterActions.registerUserSuccess),
      tap(() => {
        router.navigate([`/login`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

import { inject } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, exhaustMap, map, of } from "rxjs";

import { RegisterService } from "src/app/public/services";
import { RegisterActions } from "../actions";

export const registerUser$ = createEffect(
  (actions = inject(Actions), service = inject(RegisterService)) => {
    return actions.pipe(
      ofType(RegisterActions.registerUser),
      exhaustMap(({ data }) =>
      service.registerUser(data).pipe(
          map((res) => RegisterActions.registerUserSuccess(res)),
          catchError((error) =>
            of(RegisterActions.registerUserError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
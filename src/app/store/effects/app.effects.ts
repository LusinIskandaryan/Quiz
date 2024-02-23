import { inject } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, exhaustMap, map, of } from "rxjs";

import { UserService } from "src/app/private/services";
import { AppActions } from "../actions";

export const getCurrentUser$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(AppActions.getCurrentUser),
      exhaustMap(() =>
      service.getCurrentUser().pipe(
          map((res) => AppActions.getCurrentUserSuccess(res)),
          catchError((error) =>
            of(AppActions.getCurrentUserError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
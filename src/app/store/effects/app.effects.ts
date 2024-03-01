import { inject } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from "rxjs";

import { UserService } from "src/app/private/services";
import { AppActions } from "../actions";

export const aplicationInit$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(AppActions.aplicationInit),
      map(() => AppActions.getCurrentUser())
    );
  },
  { functional: true }
);

export const getCurrentUser$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(AppActions.getCurrentUser),
      switchMap(() =>
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
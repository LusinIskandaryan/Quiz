import { inject } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from "rxjs";

import { HttpResponseSuccessModel } from "src/app/shared/models";
import { UserService } from "src/app/private/services";
import { AppActions } from "../actions";

export const aplicationInit$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(AppActions.aplicationInit),
      map(() => {
        const id = localStorage.getItem('currentUserId') ?? '';
        return AppActions.getCurrentUser({ id });
      })
    );
  },
  { functional: true }
);

export const getCurrentUser$ = createEffect(
  (actions = inject(Actions), service = inject(UserService)) => {
    return actions.pipe(
      ofType(AppActions.getCurrentUser),
      switchMap(({ id }) =>
      service.getCurrentUser(id).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return AppActions.getCurrentUserSuccess(resData)
          }),
          catchError((error) =>
            of(AppActions.getCurrentUserError({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

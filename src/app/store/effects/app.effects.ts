import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserService } from 'src/app/private/services';
import { AppActions } from '../actions';
import { appFeature } from '../features';

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
            return AppActions.getCurrentUserSuccess(resData);
          }),
          catchError((error) => of(AppActions.getCurrentUserError({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getCurrentUserSuccess$ = createEffect(
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(AppActions.getCurrentUserSuccess),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
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
      ofType(AppActions.getCurrentUserError),
      tap(() => {
        localStorage.clear();
      })
    );
  },
  { functional: true, dispatch: false }
);

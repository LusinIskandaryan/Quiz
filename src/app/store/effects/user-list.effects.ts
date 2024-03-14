import { inject } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, of, switchMap } from 'rxjs';

import { UserService } from 'src/app/private/services';
import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { UserListActions } from '../actions';
import { appFeature } from '../features';

export const getUserList$ = createEffect(
  (
    store = inject(Store),
    actions = inject(Actions),
    service = inject(UserService)
  ) => {
    return actions.pipe(
      ofType(UserListActions.getUserList),
      concatLatestFrom(() => store.select(appFeature.selectCurrentUser)),
      switchMap(([, currentUser]) =>
        service.getUserList(currentUser!.id).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return UserListActions.getUserListSuccess(resData);
          }),
          catchError((error) => of(UserListActions.getUserListError({ error })))
        )
      )
    );
  },
  { functional: true }
);
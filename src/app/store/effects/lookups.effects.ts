import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';

import { HttpResponseSuccessModel } from 'src/app/shared/models';
import { LookupsActions, QuizActions } from '../actions';
import { LookupsService } from 'src/app/private/services';

export const addQuizInLookup$ = createEffect(
  (actions = inject(Actions), service = inject(LookupsService)) => {
    return actions.pipe(
      ofType(QuizActions.createQuizSuccess),
      switchMap(({ data }) => {
        const lookupData = { id: data.id, label: data.name };
        return service.addQuizInLookups(lookupData).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return LookupsActions.addQuizInLookupsSuccess(resData);
          }),
          catchError((error) => of(LookupsActions.addQuizInLookupsError({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const deleteQuizFromLookups$ = createEffect(
  (actions = inject(Actions), service = inject(LookupsService)) => {
    return actions.pipe(
      ofType(QuizActions.deleteQuizSuccess),
      switchMap(({ data }) => {
        return service.deleteQuizFromLookups(data.id).pipe(
          map((res) => {
            const resData = new HttpResponseSuccessModel(res, '');
            return LookupsActions.deleteQuizFromLookupsSuccess(resData);
          }),
          catchError((error) => of(LookupsActions.deleteQuizFromLookupsError({ error })))
        );
      })
    );
  },
  { functional: true }
);
import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialAppState } from '../states';
import { AppActions } from '../actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.getCurrentUser, (state) => {
    state.loading = true;
    state.currentUser = null;
  }),

  immerOn(AppActions.getCurrentUserSuccess, (state, payload) => {
    state.currentUser = payload.data;
    localStorage.setItem('currentUser', JSON.stringify(payload.data));
    state.loading = false;
  }),

  immerOn(AppActions.getCurrentUserError, (state) => {
    localStorage.removeItem('currentUser');
    state.loading = false;
  })
);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});

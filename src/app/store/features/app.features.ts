import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialAppState } from '../states';
import { AppActions } from '../actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.getCurrentUser, (state) => {
    state.loading = true;
  }),

  immerOn(AppActions.getCurrentUserSuccess, (state, payload) => {
    state.currentUser = payload.data;
  }),

  immerOn(AppActions.getCurrentUserError,
    AppActions.getCurrentUserSuccess, (state) => {
    state.loading = false;
  }),

);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});

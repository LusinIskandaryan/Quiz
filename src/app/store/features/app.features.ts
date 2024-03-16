import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialAppState } from '../states';
import { AppActions, AuthActions } from '../actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.getCurrentUser, (state) => {
    state.loading = true;
  }),

  immerOn(AppActions.getCurrentUserSuccess, (state, payload) => {
    state.currentUser = payload.data;
    localStorage.setItem('currentUser', JSON.stringify(payload.data));
    state.loading = false;
  }),

  immerOn(AppActions.getCurrentUserError, (state) => {
    localStorage.clear();
    state.loading = false;
  }),

  immerOn(AuthActions.loginSuccess, (state, { data }) => {
    state.currrentUserId = data.id;
    localStorage.setItem("currentUserId", data.id);
  }),

);

export const appFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});

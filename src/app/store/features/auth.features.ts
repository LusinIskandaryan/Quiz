import { createFeature, createReducer } from "@ngrx/store";
import { immerOn } from "ngrx-immer/store";

import { Features } from "src/app/shared/enums";
import { initialAppState } from "../states";
import { AuthActions } from "../actions/auth.actions";

export const loginReducer = createReducer(
  initialAppState,
  immerOn(AuthActions.login, (state) => {
    state.loading = true;
  }),

  immerOn(
    AuthActions.loginSuccess,
    AuthActions.loginError,
    (state) => {
      state.loading = false;
    }
  ),

  immerOn(AuthActions.logoutSuccess, (state) => {
    state.currentUser = null;
  }),
);

export const loginFeature = createFeature({
  name: Features.Register,
  reducer: loginReducer,
});
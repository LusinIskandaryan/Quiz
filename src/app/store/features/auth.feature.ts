import { createFeature, createReducer } from "@ngrx/store";
import { immerOn } from "ngrx-immer/store";

import { initialAuthState } from "../states";
import { AuthActions } from "../actions/auth.actions";
import { Features } from "../features.enum";

export const authReducer = createReducer(
  initialAuthState,
  immerOn(AuthActions.login, AuthActions.registerUser, (state) => {
    state.authLoading = true;
  }),

  immerOn(
    AuthActions.loginSuccess,
    AuthActions.loginError,
    AuthActions.registerUserSuccess,
    AuthActions.registerUserError,
    (state) => {
      state.authLoading = false;
    }
  ),
);

export const authFeature = createFeature({
  name: Features.Auth,
  reducer: authReducer,
});
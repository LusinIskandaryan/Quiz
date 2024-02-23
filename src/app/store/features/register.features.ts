import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialAppState } from '../states';
import { RegisterActions } from '../actions';

export const registerReducer = createReducer(
  initialAppState,
  immerOn(RegisterActions.registerUser, (state) => {
    state.loading = true;
  }),

  immerOn(
    RegisterActions.registerUserSuccess,
    RegisterActions.registerUserError,
    (state) => {
      state.loading = false;
    }
  )
);

export const registerFeature = createFeature({
  name: Features.Register,
  reducer: registerReducer,
});

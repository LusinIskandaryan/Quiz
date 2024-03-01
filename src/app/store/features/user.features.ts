import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialUserState } from '../states';
import { QuizActions, UserActions } from '../actions';

export const userReducer = createReducer(
  initialUserState,
  immerOn(UserActions.getUserList, (state) => {
    state.loading = true;
    state.userList = [];
  }),

  immerOn(UserActions.getUserListSuccess, (state, { data }) => {
    state.userList = data;
  }),

  immerOn(UserActions.getUser, (state) => {
    state.userId = '';
    state.loading = true;
  }),

  immerOn(UserActions.getUserSuccess, (state, { data }) => {
    state.userId = data.id;
    state.user = data;
    state.loading = false;
  }),

  immerOn(UserActions.updateUser, (state) => {
    state.user = null;
    state.loading = true;
  }),

  immerOn(QuizActions.getQuizLookups, (state) => {
    state.loading = true;
  }),

  immerOn(
    UserActions.getUserListSuccess,
    UserActions.getUserListError,
    UserActions.getUserError,
    UserActions.updateUserSuccess,
    UserActions.updateUserError,
    QuizActions.getQuizLookupsSuccess,
    QuizActions.getQuizListError,
    (state) => {
      state.loading = false;
    }
  ),

  immerOn(QuizActions.getQuizLookups, (state) => {
    state.loading = true;
  }),
);


export const userFeature = createFeature({
  name: Features.User,
  reducer: userReducer,
});

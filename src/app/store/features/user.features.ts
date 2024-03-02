import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialUserState } from '../states';
import { UserActions } from '../actions';

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
    state.user = null;
    state.userQuizList = [];
    state.loading = true;
  }),

  immerOn(UserActions.getUserSuccess, (state, { data }) => {
    state.userId = data.id;
    state.user = data;
  }),

  immerOn(UserActions.getQuizListSuccess, (state, { data }) => {
    state.userQuizList = data;
  }),

  immerOn(UserActions.updateUser, (state) => {
    state.loading = true;
  }),

  immerOn(UserActions.getLookups, (state) => {
    state.loading = true;
  }),

  immerOn(UserActions.getLookupsSuccess, (state, { data }) => {
    state.lookups = data;
  }),

  immerOn(
    UserActions.getUserListSuccess,
    UserActions.getUserListError,
    UserActions.getUserSuccess,
    UserActions.getUserError,
    UserActions.getQuizListSuccess,
    UserActions.getQuizListError,
    UserActions.updateUserSuccess,
    UserActions.updateUserError,
    UserActions.getLookupsSuccess,
    UserActions.getLookupsError,
    (state) => {
      state.loading = false;
    }
  ),
);


export const userFeature = createFeature({
  name: Features.User,
  reducer: userReducer,
});

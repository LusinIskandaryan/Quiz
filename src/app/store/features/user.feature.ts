import {
  createFeature,
  createReducer,
  createSelector,
} from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { initialUserState } from '../states';
import { AuthActions, UserActions } from '../actions';
import { Features } from '../features.enum';
import { quizFeature } from './quiz/quiz.feature';

export const userReducer = createReducer(
  initialUserState,
  immerOn(UserActions.getUserList, (state) => {
    state.loading = true;
    state.userList = [];
  }),

  immerOn(UserActions.getUserListSuccess, (state, { data }) => {
    state.userList = data;
  }),

  immerOn(
    UserActions.getUserListSuccess,
    UserActions.getUserListError,
    (state) => {
      state.loading = false;
    }
  ),

  immerOn(UserActions.getUser, (state) => {
    state.userId = '';
    state.user = null;
    state.loading = true;
  }),

  immerOn(UserActions.getUserSuccess, (state, { data }) => {
    state.userId = data.id;
    state.user = data;
  }),

  immerOn(UserActions.updateUser, (state) => {
    state.loading = true;
  }),

  immerOn(UserActions.getCurrentUser, (state) => {
    state.loading = true;
  }),

  immerOn(UserActions.getCurrentUserSuccess, (state, { data }) => {
    state.currentUser = data;
  }),

  immerOn(
    UserActions.getCurrentUserSuccess,
    UserActions.getCurrentUserError,
    UserActions.getUserSuccess,
    UserActions.getUserError,
    UserActions.updateUserSuccess,
    UserActions.updateUserError,
    (state) => {
      state.loading = false;
    }
  ),

  immerOn(AuthActions.logoutSuccess, (state) => {
    state.currentUser = null;
  }),
);

export const userFeature = createFeature({
  name: Features.User,
  reducer: userReducer,
  extraSelectors: ({ selectUser, selectLookups }) => ({
    selectUserQuizList: createSelector(
      selectUser,
      quizFeature.selectQuizList,
      (user, quizList) =>
        user?.quizIds
          ? quizList.filter((quiz) => user?.quizIds.includes(quiz.id))
          : []
    ),
    selectQuizLookup: createSelector(
      selectUser,
      quizFeature.selectQuizList,
      (user, quizList) =>
        user?.quizIds
          ? quizList.filter((item) => !user?.quizIds.includes(item.id))
          : quizList
    ),
  }),
});

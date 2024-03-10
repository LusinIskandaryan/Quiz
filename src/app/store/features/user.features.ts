import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
} from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { QuizState, initialUserState } from '../states';
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
    state.loading = true;
  }),

  immerOn(UserActions.getUserSuccess, (state, { data }) => {
    state.userId = data.id;
    state.user = data;
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
    UserActions.updateUserSuccess,
    UserActions.updateUserError,
    UserActions.getLookupsSuccess,
    UserActions.getLookupsError,
    (state) => {
      state.loading = false;
    }
  )
);

const quizSelector = createFeatureSelector<QuizState>(Features.Quiz);

const createquizSelectorMap = <T>(mapping: (state: QuizState) => T) =>
  createSelector(quizSelector, mapping);

const selectQuizList = createquizSelectorMap((state) => state.quizList);

export const userFeature = createFeature({
  name: Features.User,
  reducer: userReducer,
  extraSelectors: ({ selectUser, selectLookups }) => ({
    selectUserQuizList: createSelector(
      selectUser,
      selectQuizList,
      (user, quizList) =>
        user?.quizIds
          ? quizList.filter((quiz) => user?.quizIds.includes(quiz.id))
          : []
    ),
    selectUserQuizLookup: createSelector(
      selectUser,
      selectLookups,
      (user, lookups) =>
        user?.quizIds
          ? lookups.filter((item) => !user?.quizIds.includes(item.id))
          : lookups
    ),
  }),
});

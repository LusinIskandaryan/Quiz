import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
} from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { QuizListState, initialUserState } from '../../states';
import { LookupsActions, UserActions } from '../../actions';

export const userReducer = createReducer(
  initialUserState,
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

  immerOn(LookupsActions.getQuizLookups, (state) => {
    state.loading = true;
  }),

  immerOn(LookupsActions.getQuizLookupsSuccess, (state, { data }) => {
    state.lookups = data;
  }),

  immerOn(
    UserActions.getUserSuccess,
    UserActions.getUserError,
    UserActions.updateUserSuccess,
    UserActions.updateUserError,
    LookupsActions.getQuizLookupsSuccess,
    LookupsActions.getQuizLookupsError,
    (state) => {
      state.loading = false;
    }
  )
);

const quizListSelector = createFeatureSelector<QuizListState>(Features.QuizList);

const createquizSelectorMap = <T>(mapping: (state: QuizListState) => T) =>
  createSelector(quizListSelector, mapping);

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

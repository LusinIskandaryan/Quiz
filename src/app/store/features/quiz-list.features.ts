import { createFeature, createReducer } from '@ngrx/store';

import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialQuizListState } from '../states';
import { QuizListActions } from '../actions';

export const quizListReducer = createReducer(
  initialQuizListState,
  immerOn(QuizListActions.getQuizList, (state) => {
    state.loading = true;
    state.quizList = [];
  }),

  immerOn(QuizListActions.getQuizListSuccess, (state, { data }) => {
    state.quizList = data;
  }),

  immerOn(
    QuizListActions.getQuizListSuccess,
    QuizListActions.getQuizListError,
    (state) => {
      state.loading = false;
    }
  )
);

export const quizListFeature = createFeature({
  name: Features.QuizList,
  reducer: quizListReducer,
});
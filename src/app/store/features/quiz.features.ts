import { createFeature, createReducer } from '@ngrx/store';

import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialQuizState } from '../states';
import { QuizActions } from '../actions';

export const quizReducer = createReducer(
  initialQuizState,
  immerOn(QuizActions.getQuizList, (state) => {
    state.loading = true;
    state.quizList = {
      ...state.paginationData,
      totalCount: 0,
      items: [],
    };
  }),

  immerOn(QuizActions.initializePage, (state) => {
    state.paginationData = {
      pageNumber: 1,
      pageSize: 5,
    };
  }),

  immerOn(QuizActions.applyPagination, (state, { data }) => {
    state.paginationData = data;
  }),

  immerOn(QuizActions.getQuizListSuccess, (state, { data }) => {
    state.quizList = data;
  }),

  immerOn(QuizActions.getQuiz, (state) => {
    state.quizId = '';
    state.loading = true;
  }),

  immerOn(QuizActions.getQuizSuccess, (state, { data }) => {
    state.quizId = data.id;
    state.quiz = data;
  }),

  immerOn(
    QuizActions.updateQuiz,
    QuizActions.createQuiz,
    QuizActions.deleteQuiz,
    QuizActions.passQuiz,
    (state) => {
      state.loading = true;
    }
  ),

  immerOn(
    QuizActions.getQuizListSuccess,
    QuizActions.getQuizListError,
    QuizActions.getQuizSuccess,
    QuizActions.getQuizError,
    QuizActions.updateQuizSuccess,
    QuizActions.updateQuizError,
    QuizActions.createQuizSuccess,
    QuizActions.createQuizError,
    QuizActions.deleteQuizSuccess,
    QuizActions.deleteQuizError,
    QuizActions.passQuizSuccess,
    QuizActions.passQuizError,
    (state) => {
      state.loading = false;
    }
  )
);

export const quizFeature = createFeature({
  name: Features.Quiz,
  reducer: quizReducer,
});

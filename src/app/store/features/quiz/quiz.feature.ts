import { createFeature, createReducer } from '@ngrx/store';

import { immerOn } from 'ngrx-immer/store';

import { PageMode } from 'src/app/shared/enums';
import { initialQuizState } from '../../states';
import { PassQuizActions, QuizActions } from '../../actions';
import { Features } from '../../features.enum';

export const quizReducer = createReducer(
  initialQuizState,
  immerOn(QuizActions.getQuizList, (state) => {
    state.loading = true;
    state.quizList = [];
  }),

  immerOn(QuizActions.getQuizListSuccess, (state, { data }) => {
    state.quizList = data;
  }),

  immerOn(
    QuizActions.getQuizListSuccess,
    QuizActions.getQuizListError,
    (state) => {
      state.loading = false;
    }
  ),

  immerOn(QuizActions.getQuiz, (state) => {
    state.quizId = '';
    state.quiz = null;
    state.loading = true;
  }),

  immerOn(QuizActions.getQuizSuccess, (state, { data }) => {
    state.quizId = data.id;
    state.quiz = data;
    state.quizTimer = data.timer;
  }),

  immerOn(QuizActions.changePageMode, (state, { mode }) => {
    state.pageMode = mode;
  }),

  immerOn(QuizActions.updateQuizSuccess, (state) => {
    state.pageMode = PageMode.View;
  }),
  immerOn(QuizActions.tick, (state) => {
    state.quizTimer = state.quizTimer > 0 ? state.quizTimer - 1 : 0;
  }),
  immerOn(PassQuizActions.passQuiz, (state) => {
    state.quizTimer = 1;
  }),

  immerOn(
    QuizActions.updateQuiz,
    QuizActions.createQuiz,
    QuizActions.deleteQuiz,
    (state) => {
      state.loading = true;
    }
  ),

  immerOn(
    QuizActions.getQuizSuccess,
    QuizActions.getQuizError,
    QuizActions.updateQuizSuccess,
    QuizActions.updateQuizError,
    QuizActions.createQuizSuccess,
    QuizActions.createQuizError,
    QuizActions.deleteQuizSuccess,
    QuizActions.deleteQuizError,
    (state) => {
      state.loading = false;
    }
  )
);

export const quizFeature = createFeature({
  name: Features.Quiz,
  reducer: quizReducer,
});

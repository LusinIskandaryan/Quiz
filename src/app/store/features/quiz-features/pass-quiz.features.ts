import { createFeature, createReducer } from '@ngrx/store';

import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialQuizState } from '../../states';
import { PassQuizActions } from '../../actions';

export const passQuizReducer = createReducer(
  initialQuizState,
  immerOn(
    PassQuizActions.passQuiz,
    (state) => {
      state.loading = true;
    }
  ),

  immerOn(
    PassQuizActions.passQuizSuccess,
    PassQuizActions.passQuizError,
    (state) => {
      state.loading = false;
    }
  )
);

export const passQuizFeature = createFeature({
  name: Features.PassQuiz,
  reducer: passQuizReducer,
});

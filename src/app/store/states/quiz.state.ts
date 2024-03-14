import { Quiz } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";

export type QuizState = {
  quizId: string;
  quiz: Quiz | null;
  loading: boolean,
  pageMode: PageMode;
  quizTimer: number
};

export const initialQuizState: QuizState = {
  quizId: '',
  quiz: null,
  loading: false,
  pageMode: PageMode.View,
  quizTimer: 1,
};
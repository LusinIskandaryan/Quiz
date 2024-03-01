import { Quiz, QuizLookups } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";

export type QuizState = {
  quizId: string;
  quiz: Quiz | null;
  quizList: Quiz[];
  quizLookups: QuizLookups[];
  loading: boolean,
  pageMode: PageMode;
};

export const initialQuizState: QuizState = {
  quizId: '',
  quiz: null,
  quizList: [],
  quizLookups: [],
  loading: false,
  pageMode: PageMode.View,
};
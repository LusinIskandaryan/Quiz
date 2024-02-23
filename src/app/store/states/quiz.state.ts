import { Quiz } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";

export type QuizState = {
  quizId: string;
  quiz: Quiz | null;
  quizList: Quiz[];
  loading: boolean,
  pageMode: PageMode;
};

export const initialQuizState: QuizState = {
  quizId: '',
  quiz: null,
  quizList: [],
  loading: false,
  pageMode: PageMode.Create,
};
import { Quiz } from "src/app/private/interfaces";

export type QuizListState = {
  quizList: Quiz[];
  loading: boolean;
};

export const initialQuizListState: QuizListState = {
  quizList: [],
  loading: false,
};
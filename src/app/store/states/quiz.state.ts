import { Quiz } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";
import { BaseTable, List } from "src/app/shared/interfaces";

export type QuizState = {
  quizId: string;
  quiz: Quiz | null;
  quizList: List<Quiz[]>;
  paginationData: BaseTable,
  loading: boolean,
  pageMode: PageMode;
};

export const initialQuizState: QuizState = {
  quizId: '',
  quiz: null,
  quizList: {
    pageNumber: 1,
    pageSize: 5,
    totalCount: 0,
    items: []
  },
  paginationData: {
    pageNumber: 1,
    pageSize: 5,
  },
  loading: false,
  pageMode: PageMode.View,
};
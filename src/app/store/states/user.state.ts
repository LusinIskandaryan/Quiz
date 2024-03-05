import { Lookups, Quiz, User } from "src/app/private/interfaces";
import { BaseTable, List } from "src/app/shared/interfaces";

export type UserState = {
  userId: string;
  user: User | null;
  userQuizList: Quiz[];
  userList:  List<User[]>;
  paginationData: BaseTable,
  lookups: Lookups[];
  loading: boolean,
};

export const initialUserState: UserState = {
  userId: '',
  user: null,
  userQuizList: [],
  userList: {
    pageNumber: 1,
    pageSize: 5,
    totalCount: 0,
    items: []
  },
  paginationData: {
    pageNumber: 1,
    pageSize: 5,
  },
  lookups: [],
  loading: false,
};
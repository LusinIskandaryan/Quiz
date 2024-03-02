import { Lookups, Quiz, User } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";

export type UserState = {
  userId: string;
  user: User | null;
  userQuizList: Quiz[];
  userList: User[];
  lookups: Lookups[];
  loading: boolean,
  pageMode: PageMode;
};

export const initialUserState: UserState = {
  userId: '',
  user: null,
  userQuizList: [],
  userList: [],
  lookups: [],
  loading: false,
  pageMode: PageMode.View,
};
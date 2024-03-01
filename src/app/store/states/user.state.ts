import { User } from "src/app/private/interfaces";
import { PageMode } from "src/app/shared/enums";

export type UserState = {
  userId: string;
  user: User | null;
  userList: User[];
  loading: boolean,
  pageMode: PageMode;
};

export const initialUserState: UserState = {
  userId: '',
  user: null,
  userList: [],
  loading: false,
  pageMode: PageMode.View,
};
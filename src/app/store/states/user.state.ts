import { Lookups, User } from "src/app/private/interfaces";

export type UserState = {
  userId: string;
  user: User | null;
  userList:  User[];
  lookups: Lookups[];
  loading: boolean;
};

export const initialUserState: UserState = {
  userId: '',
  user: null,
  userList: [],
  lookups: [],
  loading: false,
};
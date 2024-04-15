import { Lookups, User } from "src/app/private/interfaces";

export type UserState = {
  userList:  User[];
  currentUser: User | null;
  userId: string;
  user: User | null;
  lookups: Lookups[];
  loading: boolean;
};

export const initialUserState: UserState = {
  currentUser: null,
  userId: '',
  user: null,
  userList: [],
  lookups: [],
  loading: false,
};
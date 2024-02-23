import { User } from "src/app/private/interfaces";

export type UserState = {
  userId: string;
  user: User | null;
  userList: User[];
  loading: boolean,
};

export const initialUserState: UserState = {
  userId: '',
  user: null,
  userList: [],
  loading: false,
};
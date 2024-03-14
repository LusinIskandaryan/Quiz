import { User } from "src/app/private/interfaces";

export type UserListState = {
  userList:  User[];
  loading: boolean,
};

export const initialUserListState: UserListState = {
  userList: [],
  loading: false,
};
import { User } from "src/app/private/interfaces";

export type AppState = {
  currrentUserId: string;
  currentUser: User | null;
  loading: boolean;
};

export const initialAppState: AppState = {
  currrentUserId: '',
  currentUser: null,
  loading: false,
};
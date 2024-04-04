import { User } from "src/app/private/interfaces";

export type AppState = {
  currentUser: User | null;
  loading: boolean;
};

export const initialAppState: AppState = {
  currentUser: null,
  loading: false,
};
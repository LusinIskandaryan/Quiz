import { UserRole } from "../enums";

export interface User {
  id: string,
  email: string;
  role: UserRole;
  name: string;
  quizIds: string[];
}
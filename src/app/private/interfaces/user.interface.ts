import { UserRole } from "../enums";

export interface User {
  id: string,
  email: string;
  role: UserRole;
  firstName: string;
  quizIds: string[];
}
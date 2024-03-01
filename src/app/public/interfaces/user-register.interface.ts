import { UserRole } from "src/app/private/enums";

export interface UserRegister {
  email: string;
  password: string;
  isAdmin: UserRole;
  fullName: string;
  confirmPassword: string;
}
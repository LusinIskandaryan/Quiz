import { UserRole } from "src/app/private/enums";

export interface UserRegister {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  confirmPassword: string;
}
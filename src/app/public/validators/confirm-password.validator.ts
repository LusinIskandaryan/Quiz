import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password?.value &&
    confirmPassword?.value &&
    (password.touched || password.dirty) &&
    (confirmPassword.touched || confirmPassword.dirty) &&
    password.value !== confirmPassword.value
    ? { invalidConfirmPassword: true }
    : null;
};

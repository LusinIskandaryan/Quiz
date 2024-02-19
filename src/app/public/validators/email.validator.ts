import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !EMAIL_REGEXP.test(control.value) ? { invalidEmail: true } : null;
};

import { ErrorType } from '../enums';

export const ErrorMessages = new Map<
  ErrorType,
  {
    getMessage: Function;
  }
>([
  [ErrorType.required, { getMessage: () => 'This field is required' }],
  [
    ErrorType.minlength,
    {
      getMessage: (requiredLength: number) =>
        `Minimum ${requiredLength} characters allowed`,
    },
  ],
  [
    ErrorType.maxlength,
    {
      getMessage: (requiredLength: number) =>
        `Minimum ${requiredLength} characters allowed`,
    },
  ],
  [
    ErrorType.invalidConfirmPassword,
    { getMessage: () => 'Password is not correct' },
  ],
  [ErrorType.invalidEmail, { getMessage: () => 'Invalid email format' }],
]);

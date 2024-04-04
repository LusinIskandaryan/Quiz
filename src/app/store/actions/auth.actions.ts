import { createActionGroup, emptyProps, props } from '@ngrx/store';


import { User } from 'src/app/private/interfaces';
import { UserLogin, UserRegister } from 'src/app/public/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ data: UserLogin }>(),
    'Login Success': httpSuccessProps<User>(),
    'Login Error': httpErrorProps(),

    'Logout': emptyProps(),
    'Logout Success': httpSuccessProps<string>(),
    'Logout Error': httpErrorProps(),

    'Register User': props<{ data: UserRegister }>(),
    'Register User Success': httpSuccessProps<UserRegister>(),
    'Register User Error': httpErrorProps(),
  },
});

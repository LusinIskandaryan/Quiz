import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserLogin } from 'src/app/public/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ data: UserLogin }>(),
    'Login Success': httpSuccessProps<string>(),
    'Login Error': httpErrorProps(),

    'Logout': emptyProps(),
    'Logout Success': httpSuccessProps<string>(),
    'Logout Error': httpErrorProps(),
  },
});

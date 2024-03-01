import { createActionGroup, props } from '@ngrx/store';

import { UserRegister } from 'src/app/public/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const RegisterActions = createActionGroup({
  source: 'Register',
  events: {
    'Register User': props<{ data: UserRegister }>(),
    'Register User Success': httpSuccessProps<string>(),
    'Register User Error': httpErrorProps(),
  },
});

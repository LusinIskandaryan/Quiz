import { createActionGroup, props } from '@ngrx/store';

import { User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const RegisterActions = createActionGroup({
  source: 'Register',
  events: {
    'Register User': props<{ data: User }>(),
    'Register User Success': httpSuccessProps<string>(),
    'Register User Error': httpErrorProps(),
  },
});

import { createActionGroup, props } from '@ngrx/store';

import { User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User': props<{ userId: string }>(),
    'Get User Success': httpSuccessProps<User>(),
    'Get User Error': httpErrorProps(),

    'Update User': props<{ data: User }>(),
    'Update User Success': httpSuccessProps<User>(),
    'Update User Error': httpErrorProps(),
  },
});

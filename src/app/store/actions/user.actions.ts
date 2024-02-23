import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Update User': props<{ data: User }>(),
    'Update User Success': httpSuccessProps<string>(),
    'Update User Error': httpErrorProps(),

    'Get User': props<{ userId: string }>(),
    'Get User Success': httpSuccessProps<User>(),
    'Get User Error': httpErrorProps(),

    'Get User List': emptyProps(),
    'Get User List Success': httpSuccessProps<User[]>(),
    'Get User List Error': httpErrorProps(),
  },
});

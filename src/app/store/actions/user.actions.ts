import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User List': emptyProps(),
    'Get User List Success': httpSuccessProps<User[]>(),
    'Get User List Error': httpErrorProps(),

    'Get Current User': props<{id: string}>(),
    'Get Current User Success': httpSuccessProps<User>(),
    'Get Current User Error': httpErrorProps(),

    'Get User': props<{ userId: string }>(),
    'Get User Success': httpSuccessProps<User>(),
    'Get User Error': httpErrorProps(),

    'Update User': props<{ data: User }>(),
    'Update User Success': httpSuccessProps<User>(),
    'Update User Error': httpErrorProps(),
  },
});

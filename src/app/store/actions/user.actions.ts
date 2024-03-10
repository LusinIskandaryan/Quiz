import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Lookups, User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User List': emptyProps(),
    'Get User List Success': httpSuccessProps<User[]>(),
    'Get User List Error': httpErrorProps(),

    'Get User': props<{ userId: string }>(),
    'Get User Success': httpSuccessProps<User>(),
    'Get User Error': httpErrorProps(),

    'Get Lookups': emptyProps(),
    'Get Lookups Success': httpSuccessProps<Lookups[]>(),
    'Get Lookups Error': httpErrorProps(),

    'Update User': props<{ data: User }>(),
    'Update User Success': httpSuccessProps<User>(),
    'Update User Error': httpErrorProps(),
  },
});

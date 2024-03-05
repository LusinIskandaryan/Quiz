import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Lookups, Quiz, User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';
import { BaseTable, List } from 'src/app/shared/interfaces';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Initialize Page': emptyProps(),

    'Apply Pagination': props<{data: BaseTable}>(),

    'Get User List': emptyProps(),
    'Get User List Success': httpSuccessProps<List<User[]>>(),
    'Get User List Error': httpErrorProps(),

    'User Init': props<{ userId: string }>(),

    'Get User': props<{ userId: string }>(),
    'Get User Success': httpSuccessProps<User>(),
    'Get User Error': httpErrorProps(),

    'Get Lookups': emptyProps(),
    'Get Lookups Success': httpSuccessProps<Lookups[]>(),
    'Get Lookups Error': httpErrorProps(),

    'Get User Quiz List Success': props<{ data: Quiz[] }>(),
    'Get User Quiz List Error': httpErrorProps(),

    'Update User': props<{ data: User }>(),
    'Update User Success': httpSuccessProps<string>(),
    'Update User Error': httpErrorProps(),
  },
});

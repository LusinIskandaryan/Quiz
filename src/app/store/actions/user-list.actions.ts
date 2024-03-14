import { createActionGroup, emptyProps } from '@ngrx/store';

import { User } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const UserListActions = createActionGroup({
  source: 'UserList',
  events: {
    'Get User List': emptyProps(),
    'Get User List Success': httpSuccessProps<User[]>(),
    'Get User List Error': httpErrorProps(),
  }})
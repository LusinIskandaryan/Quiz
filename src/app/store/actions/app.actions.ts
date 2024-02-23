import { createActionGroup, emptyProps } from "@ngrx/store";

import { User } from "src/app/private/interfaces";
import { httpErrorProps, httpSuccessProps } from "src/app/shared/functions";

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Get Current User': emptyProps(),
    'Get Current User Success': httpSuccessProps<User>(),
    'Get Current User Error': httpErrorProps(),
  }
})
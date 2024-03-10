import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { User } from "src/app/private/interfaces";
import { httpErrorProps, httpSuccessProps } from "src/app/shared/functions";

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Aplication Init': emptyProps(),

    'Get Current User': props<{id: string}>(),
    'Get Current User Success': httpSuccessProps<User>(),
    'Get Current User Error': httpErrorProps(),
  }
})
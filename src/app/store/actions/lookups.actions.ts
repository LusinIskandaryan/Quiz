import { createActionGroup, emptyProps } from "@ngrx/store";

import { Lookups } from "src/app/private/interfaces";
import { httpErrorProps, httpSuccessProps } from "src/app/shared/functions";

export const LookupsActions = createActionGroup({
  source: 'Lookups',
  events: {
    'Get Quiz Lookups': emptyProps(),
    'Get Quiz Lookups Success': httpSuccessProps<Lookups[]>(),
    'Get Quiz Lookups Error': httpErrorProps(),

    'Add Quiz In Lookups Success': httpSuccessProps<Lookups>(),
    'Add Quiz In Lookups Error': httpErrorProps(),

    'Delete Quiz From Lookups Success': httpSuccessProps<Lookups>(),
    'Delete Quiz From Lookups Error': httpErrorProps(),
  },
});

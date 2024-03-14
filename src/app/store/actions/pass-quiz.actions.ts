import { createActionGroup, props } from '@ngrx/store';

import { Quiz } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const PassQuizActions = createActionGroup({
  source: 'PassQuiz',
  events: {
    'Pass Quiz': props<{ data: Quiz }>(),
    'Pass Quiz Success': httpSuccessProps<boolean>(),
    'Pass Quiz Error': httpErrorProps(),
  },
});

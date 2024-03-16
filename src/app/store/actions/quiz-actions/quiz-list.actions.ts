import { createActionGroup, emptyProps } from '@ngrx/store';

import { Quiz } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const QuizListActions = createActionGroup({
  source: 'QuizList',
  events: {
    'Get Quiz List': emptyProps(),
    'Get Quiz List Success': httpSuccessProps<Quiz[]>(),
    'Get Quiz List Error': httpErrorProps(),
  },
});

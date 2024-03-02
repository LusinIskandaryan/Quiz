import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Quiz } from 'src/app/private/interfaces';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const QuizActions = createActionGroup({
  source: 'Quiz',
  events: {
    'Get Quiz List': emptyProps(),
    'Get Quiz List Success': httpSuccessProps<Quiz[]>(),
    'Get Quiz List Error': httpErrorProps(),

    'Get Quiz': props<{ quizId: string }>(),
    'Get Quiz Success': httpSuccessProps<Quiz>(),
    'Get Quiz Error': httpErrorProps(),

    'Create Quiz': props<{ data: Quiz }>(),
    'Create Quiz Success': httpSuccessProps<string>(),
    'Create Quiz Error': httpErrorProps(),

    'Update Quiz': props<{ data: Quiz }>(),
    'Update Quiz Success': httpSuccessProps<string>(),
    'Update Quiz Error': httpErrorProps(),

    'Delete Quiz': props<{ quizId: string }>(),
    'Delete Quiz Success': httpSuccessProps<boolean>(),
    'Delete Quiz Error': httpErrorProps(),

    'Pass Quiz': props<{ data: Quiz }>(),
    'Pass Quiz Success': httpSuccessProps<string>(),
    'Pass Quiz Error': httpErrorProps(),
  },
});

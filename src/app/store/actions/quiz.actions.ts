import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Quiz } from 'src/app/private/interfaces';
import { PageMode } from 'src/app/shared/enums';
import { httpErrorProps, httpSuccessProps } from 'src/app/shared/functions';

export const QuizActions = createActionGroup({
  source: 'Quiz',
  events: {
    'Get Quiz': props<{ quizId: string }>(),
    'Get Quiz Success': httpSuccessProps<Quiz>(),
    'Get Quiz Error': httpErrorProps(),

    'Create Quiz': props<{ data: Quiz }>(),
    'Create Quiz Success': httpSuccessProps<Quiz>(),
    'Create Quiz Error': httpErrorProps(),

    'Update Quiz': props<{ data: Quiz }>(),
    'Update Quiz Success': httpSuccessProps<Quiz>(),
    'Update Quiz Error': httpErrorProps(),

    'Delete Quiz': props<{ quizId: string }>(),
    'Delete Quiz Success': httpSuccessProps<Quiz>(),
    'Delete Quiz Error': httpErrorProps(),

    'Start Timer': emptyProps(),
    'Tick': emptyProps(),
    'Stop Timer': emptyProps(),

    'Change Page Mode': props<{ mode: PageMode }>(),
  },
});

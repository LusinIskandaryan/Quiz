import { inject } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';

import { tap } from 'rxjs/operators';

import { ErrorHandlerService, ToastService } from 'src/app/shared/services';

export class GlobalEffects {
  private readonly toastService = inject(ToastService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  successMessage$ = createEffect(
    (actions = inject(Actions)) => {
      return actions.pipe(
        tap(
          (
            action: Action & {
              success: boolean;
              message: string;
            }
          ) => {
            if (action.success && action.message) {
              this.toastService.success(action.message);
            }
          }
        )
      );
    },
    { dispatch: false }
  );

  errorMessage$ = createEffect(
    (actions = inject(Actions)) => {
      return actions.pipe(
        tap(
          (
            action: Action & {
              success: boolean;
              error: Error;
            }
          ) => {
            if (action.success === false) {
              this.errorHandlerService.handle(action.error);
            }
          }
        )
      );
    },
    { dispatch: false }
  );
}

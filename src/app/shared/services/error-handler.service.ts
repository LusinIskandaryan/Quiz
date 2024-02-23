import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {
  private readonly toastService = inject(ToastService);
  private readonly store = inject(Store);
  public readonly router = inject(Router);

  handle(error: Error) {
    const messageTitle = 'Error';
    if (error instanceof HttpErrorResponse) {
      if (error.error?.message) {
        this.toastService.error(error.error.message, messageTitle);
      }
    }
  }
}

import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { ConfirmationService, MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { routes } from './app.routes';
import { BASE_URL } from './shared/api/tokens';
import { GlobalEffects } from './store/effects/global.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionTypeUniqueness: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      }
    ),
    provideEffects([GlobalEffects]),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
    MessageService,
    ConfirmationService,
    ErrorHandler
  ],
};

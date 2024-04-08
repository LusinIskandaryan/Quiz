import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { emailValidator } from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { ValueTrimDirective } from 'src/app/shared/directives';
import { authFeature } from 'src/app/store/features';
import { UserLogin } from '../../interfaces';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ButtonModule,
    ValidationMessagesComponent,
    ValueTrimDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);
  loading = this.store.selectSignal(
    authFeature.selectAuthLoading
  );
  form = this.fb.group({
    email: ['', { validators: [Validators.required, emailValidator] }],
    password: ['', { validators: [Validators.required] }],
  });
  formCtrl = this.form.controls;

  signIn(event: MouseEvent): void {
    event.stopPropagation();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(AuthActions.login({ data: this.form.value as UserLogin }));
    }
  }
}

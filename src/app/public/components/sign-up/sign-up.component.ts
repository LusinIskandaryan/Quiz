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

import {
  confirmPasswordValidator,
  emailValidator,
} from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { UserRole } from 'src/app/private/enums';
import { ValueTrimDirective } from 'src/app/shared/directives';
import { AuthActions } from 'src/app/store/actions';
import { authFeature } from 'src/app/store/features';

import { UserRegister } from '../../interfaces';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule,
    CheckboxModule,
    ValidationMessagesComponent,
    ValueTrimDirective,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);
  loading = this.store.selectSignal(
    authFeature.selectAuthLoading
  );
  form = this.fb.group({
    name: ['', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ],
    }],
    email: ['', {
      validators: [Validators.required, emailValidator],
    }],
    password: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ],
    }],
    confirmPassword: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ],
    }],
    role: false,
  }, { validators: confirmPasswordValidator });
  formCtrl = this.form.controls;

  signUp(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data: UserRegister = {
        ...this.form.value,
        role: this.form.value.role ? UserRole.admin : UserRole.user,
      } as UserRegister;
      this.store.dispatch(AuthActions.registerUser({ data }));
    }
  }
}

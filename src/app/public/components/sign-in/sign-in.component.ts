import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { emailValidator } from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { ValueTrimDirective } from 'src/app/shared/directives';
import { UserLogin } from '../../interfaces';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    ValidationMessagesComponent,
    ValueTrimDirective
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly store = inject(Store);
  formCtrl = {
    email: new FormControl<string | null>(null, { validators: [Validators.required, emailValidator] }),
    password: new FormControl<string | null>(null, { validators: [Validators.required] }),
  };
  form = new FormGroup(this.formCtrl);

  signIn(event: MouseEvent): void {
    event.stopPropagation();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = this.form.value as UserLogin;
      this.store.dispatch(
        AuthActions.login({ data })
      );
    }
  }
}

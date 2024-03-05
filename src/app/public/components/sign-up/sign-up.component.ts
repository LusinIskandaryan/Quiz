import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { confirmPasswordValidator, emailValidator } from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { RegisterActions } from 'src/app/store/actions';
import { UserRole } from 'src/app/private/enums';
import { UserRegister } from '../../interfaces';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ValidationMessagesComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private readonly store = inject(Store);
  formCtrl = {
    fullName: new FormControl<string | null>(null, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(15)] }),
    email: new FormControl<string | null>(null, { validators: [ Validators.required, emailValidator ] }),
    password: new FormControl<string | null>(null, { validators: [ Validators.required, Validators.minLength(5), Validators.maxLength(10) ] }),
    confirmPassword: new FormControl<string | null>(null, { validators: [ Validators.required, Validators.minLength(5), Validators.maxLength(10) ] }),
    isAdmin: new FormControl<boolean>(false),
  };
  form = new FormGroup(this.formCtrl, { validators: confirmPasswordValidator });

  signUp(): void {
    const data = {...this.form.value, isAdmin: this.form.value.isAdmin ? UserRole.admin : UserRole.user} as UserRegister;
    this.store.dispatch(RegisterActions.registerUser({ data }))
  }

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { confirmPasswordValidator, emailValidator } from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';

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
  formCtrl = {
    fullName: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ]),
    email: new FormControl('', [ Validators.required, emailValidator ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(10) ]),
    confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(10) ]),
    isAdmin: new FormControl(false),
  };
  form = new FormGroup(this.formCtrl, { validators: confirmPasswordValidator });

  signUp(): void {
    console.log(this.form)
  }

}

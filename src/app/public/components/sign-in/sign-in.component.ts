import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { emailValidator } from 'src/app/public/validators';
import { ValidationMessagesComponent } from 'src/app/shared/components';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  form = new FormGroup({
    email: new FormControl(null, [ Validators.required, emailValidator ]),
    password: new FormControl(null, [ Validators.required ]),
  });
  controls = {
    email: this.form.get('email') as FormControl,
    password: this.form.get('password') as FormControl,
  };

  signIn(): void {

  }

}

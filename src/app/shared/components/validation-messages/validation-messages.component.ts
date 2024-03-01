import { Component, effect, input, signal } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { ErrorType } from 'src/app/shared/enums';
import { ErrorMessages } from 'src/app/shared/consts';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss',
})
export class ValidationMessagesComponent {
  control = input<FormControl | null>(null);
  form = input<FormGroup | null>(null);
  value = input<any>(null);
  errorMessage = signal<string | null>(null);

  constructor() {
    effect(
      () => {
        const control = this.control() ?? this.form();
        if (this.value() && control) {
          if (this.isControlInvalid(control)) {
            this.setValidationMessage(control);
          } else {
            this.errorMessage.set(null);
          }
        }
        if (!this.value() && control && this.isControlInvalid(control)) {
          this.setValidationMessage(control);
        }
      },
      { allowSignalWrites: true }
    );
  }

  setValidationMessage(control: FormControl | FormGroup): void {
    let errorMessage = null;
    if (this.value() || this.form()) {
      const error = control.errors as ValidationErrors;
      const key: ErrorType = Object.keys(error)[0] as ErrorType;
      const requiredLength = error[key]['requiredLength'] || null;
      errorMessage = ErrorMessages.get(key)?.getMessage(requiredLength);
    } else if (!this.value() && this.control()){
      errorMessage = ErrorMessages.get(ErrorType.required)?.getMessage();
    }
    this.errorMessage.set(errorMessage);
  }

  isControlInvalid(control: FormControl | FormGroup): boolean {
    return !!(control.errors && (control.touched || control.dirty));
  }
}

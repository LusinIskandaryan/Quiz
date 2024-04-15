import { Component, Input, OnChanges, signal } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { ErrorType } from 'src/app/shared/enums';
import { ErrorMessages } from 'src/app/shared/consts';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss',
})
export class ValidationMessagesComponent implements OnChanges {
  @Input() control: FormControl | null = null;
  @Input() form: FormGroup | null = null;
  @Input() value: any = null;
  errorMessage = signal<string>('');

  ngOnChanges(): void {
    this.errorMessage.set('');
    const control = this.control || this.form;
    if (control?.errors) {
      this.getErrorMessage(control.errors);
    }
  }

  getErrorMessage(errors: ValidationErrors): void {
    let errorMessage = '';
    const key = Object.keys(errors)[0] as ErrorType;
    const requiredLength = errors[key]['requiredLength'] || null;
    errorMessage = ErrorMessages.get(key)?.getMessage(requiredLength);
    this.errorMessage.set(errorMessage);
  }
}

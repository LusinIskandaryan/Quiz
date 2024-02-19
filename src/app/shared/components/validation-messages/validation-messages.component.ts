import { Component, OnInit, effect, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.css',
})
export class ValidationMessagesComponent {
  control = input.required<FormControl>();

  constructor() {
    effect(() => console.log(this.control()))

  }
}

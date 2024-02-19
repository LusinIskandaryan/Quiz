import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent, HeaderComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css',
})
export class PrivateComponent {

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}

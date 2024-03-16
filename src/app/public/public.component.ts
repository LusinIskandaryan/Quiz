import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { appFeature } from '../store/features';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    RouterOutlet,
    ProgressSpinnerModule
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {
  private readonly store = inject(Store);
  loading = this.store.selectSignal(
    appFeature.selectLoading
  );
}

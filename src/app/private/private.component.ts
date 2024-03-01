import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FooterComponent, HeaderComponent } from 'src/app/shared/components';
import { AppActions } from '../store/actions';
import { appFeature } from '../store/features';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ProgressSpinnerModule],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent implements OnInit {
  private readonly store = inject(Store);
  currentUser = this.store.selectSignal(
    appFeature.selectCurrentUser
  );
  loading = this.store.selectSignal(
    appFeature.selectLoading
  );

  ngOnInit(): void {
    if (!this.currentUser()) {
      this.store.dispatch(AppActions.aplicationInit());
    }
  }
}

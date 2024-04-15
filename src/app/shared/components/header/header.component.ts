import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthActions } from 'src/app/store/actions';
import { userFeature } from 'src/app/store/features';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);
  currentUser = this.store.selectSignal(userFeature.selectCurrentUser);

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

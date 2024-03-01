import { Component, computed, inject, signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

import { appFeature } from 'src/app/store/features';
import { UserRole } from '../../enums';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [ TabMenuModule ],
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss'
})
export class TabMenuComponent {
  private readonly store = inject(Store);

  currentUser = this.store.selectSignal(appFeature.selectCurrentUser);
  isUserAdmin = computed(() => this.currentUser()?.role === UserRole.admin);

  items: MenuItem[] = [
    { label: 'Quize', routerLink: '/quiz/list', visible: true },
    {
      label: 'Users',
      routerLink: '/user/list',
      visible: this.isUserAdmin(),
    },
  ];

  activeItem = signal<MenuItem>(this.items[0].visible ? this.items[0] : this.items[1]);

  onActiveItemChange(event: MenuItem): void {
    this.activeItem.set(event);
  }

}

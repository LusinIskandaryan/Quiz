import { Component, signal } from '@angular/core';

import { MenuItem } from 'primeng/api/menuitem';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TabMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] = [
    { label: 'Users', url: '/user/list', visible: true },
    { label: 'Quize', url: '/quiz/list', visible: true },
  ];

  activeItem = signal<MenuItem>(this.items[0]);

  onActiveItemChange(event: MenuItem): void {
    this.activeItem.set(event);
  }

  logOut(): void {
    
  }

}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { userListFeature } from 'src/app/store/features';
import { UserListActions } from 'src/app/store/actions';
import { TableColumn } from 'src/app/private/interfaces';
import { TabMenuComponent } from 'src/app/private/components/tab-menu/tab-menu.component';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, TabMenuComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private readonly store = inject(Store);
  vm = this.store.selectSignal(userListFeature.selectUserListState);
  userListColumns: TableColumn[] = [
    { field: 'name', header: 'Name' },
  ];

  ngOnInit(): void {
    this.store.dispatch(UserListActions.getUserList());
  }
}

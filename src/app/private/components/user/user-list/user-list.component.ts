import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';

import { userFeature } from 'src/app/store/features';
import { UserActions } from 'src/app/store/actions';
import { TableColumn } from 'src/app/private/interfaces';
import { TabMenuComponent } from 'src/app/private/components/tab-menu/tab-menu.component';
import { BaseTable } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, PaginatorModule, TabMenuComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private readonly store = inject(Store);
  vm = this.store.selectSignal(userFeature.selectUserState);
  userListColumns: TableColumn[] = [
    { field: 'firstName', header: 'Name' },
  ];
  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.store.dispatch(UserActions.initializePage());
  }

  onPageChange(event: LazyLoadEvent): void {
    const data = {
      pageNumber: 1 + event.first! / event.rows!,
      pageSize: event.rows!,
    } as BaseTable;
    this.store.dispatch(UserActions.applyPagination({data}));
  }
}

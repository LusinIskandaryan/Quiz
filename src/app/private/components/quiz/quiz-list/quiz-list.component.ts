import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';

import { Quiz, TableColumn } from 'src/app/private/interfaces';
import { appFeature, quizFeature } from 'src/app/store/features';
import { QuizActions } from 'src/app/store/actions';
import { TableFieldType, UserRole } from 'src/app/private/enums';
import { TabMenuComponent } from '../../tab-menu/tab-menu.component';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, PaginatorModule, TabMenuComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
})
export class QuizListComponent implements OnInit {
  private readonly store = inject(Store);

  currentUser = this.store.selectSignal(appFeature.selectCurrentUser);
  isUserAdmin = computed(() => this.currentUser()?.role === UserRole.admin);
  
  vm = this.store.selectSignal(quizFeature.selectQuizState);
  quizListColumns = computed<TableColumn[]>(() => {
    if (this.isUserAdmin()) {
      const list = [
        { field: 'name', header: 'Name' },
        { field: 'edit', header: '' },
        { field: 'delete', header: '' },
      ];
      return list;
    }
    const list = [
      { field: 'name', header: 'Name' },
      { field: 'status', header: '' },
    ];
    return list;
  });
  tableFieldType = TableFieldType;
  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.store.dispatch(QuizActions.getQuizList());
  }

  onPageChange(event: LazyLoadEvent): void {
    this.first = event.first!;
    this.rows = event.rows!;
  }

  deleteQuiz(quiz: Quiz): void {
    this.store.dispatch(QuizActions.deleteQuiz({ quizId: quiz.id }));
  }
}

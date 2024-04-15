import { Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Quiz, TableColumn } from 'src/app/private/interfaces';
import { quizFeature, userFeature } from 'src/app/store/features';
import { QuizActions } from 'src/app/store/actions';
import { TableFieldType, UserRole } from 'src/app/private/enums';
import { TabMenuComponent } from 'src/app/private/components/tab-menu/tab-menu.component';
import { PageMode } from 'src/app/shared/enums';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, TabMenuComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
})
export class QuizListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  currentUser = this.store.selectSignal(userFeature.selectCurrentUser);
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
  pageMode = PageMode;

  ngOnInit(): void {
    this.store.dispatch(QuizActions.getQuizList());
  }

  changePageMode(event: MouseEvent, mode: PageMode): void {
    event.stopPropagation();
    this.store.dispatch(QuizActions.changePageMode({ mode }));
  }

  deleteQuiz(event: MouseEvent, quiz: Quiz): void {
    event.stopPropagation();
    this.store.dispatch(QuizActions.deleteQuiz({ quizId: quiz.id }));
  }
}

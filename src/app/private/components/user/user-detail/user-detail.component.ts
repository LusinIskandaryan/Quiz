import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Lookups, Quiz, User } from 'src/app/private/interfaces';
import { QuizActions, UserActions } from 'src/app/store/actions';
import { quizFeature, userFeature } from 'src/app/store/features';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonModule, CardModule, MultiSelectModule, ProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  @Input() userId = '';
  private readonly store = inject(Store);
  vm = this.store.selectSignal(userFeature.selectUserState);
  quizIds = computed(() => this.vm().user?.quizIds);
  selectUserQuizList = this.store.selectSignal(userFeature.selectUserQuizList);
  selectQuizList = this.store.selectSignal(quizFeature.selectQuizList);
  selectUserQuizLookups = this.store.selectSignal(
    userFeature.selectQuizLookup
  );
  quizList = new FormControl<Lookups[]>([]);

  constructor() {
    if (!this.selectQuizList().length) {
      this.store.dispatch(QuizActions.getQuizList());
    }
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser({ userId: this.userId }));
  }

  deleteQuiz(event: MouseEvent, quiz: Quiz): void {
    event.stopPropagation();
    const quizIds = [...this.quizIds()!].filter((id) => id !== quiz.id);
    const data = { ...this.vm().user, quizIds } as User;
    this.store.dispatch(UserActions.updateUser({ data }));
  }

  assignQuiz(): void {
    const multiselectValue = this.quizList.value;
    const quizIds = this.quizIds() ? [...this.quizIds()!] : [];
    multiselectValue?.forEach((item) => quizIds.push(item.id));
    const data = { ...this.vm().user, quizIds } as User;
    this.store.dispatch(UserActions.updateUser({ data }));
    this.quizList.patchValue([]);
  }

  cleare(): void {
    this.quizList.patchValue([]);
  }
}

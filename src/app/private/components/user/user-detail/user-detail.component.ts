import { Component, Input, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Lookups, Quiz, User } from 'src/app/private/interfaces';
import { UserActions } from 'src/app/store/actions';
import { quizFeature, userFeature } from 'src/app/store/features';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonModule, CardModule, MultiSelectModule, ProgressSpinnerModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  @Input() userId = '';
  private readonly store = inject(Store);
  vm = this.store.selectSignal(userFeature.selectUserState);
  selectQuizList = this.store.selectSignal(quizFeature.selectQuizList);

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser({ userId: this.userId }));
  }

  deleteQuiz(event: MouseEvent, quiz: Quiz): void {
    event.stopPropagation();
    const quizIds = [...this.vm().user!.quizIds].filter(id => id !== quiz.id);
    const data = {...this.vm().user, quizIds} as User;
    this.store.dispatch(UserActions.updateUser({ data }));
  }

  assignQuiz(value: Lookups[]): void {
    const quizIds = [...this.vm().user!.quizIds];
    value.forEach(item => quizIds.push(`${item.id}`));
    const data = {...this.vm().user, quizIds} as User;
    this.store.dispatch(UserActions.updateUser({ data }));
  }
}

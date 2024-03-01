import { Component, Input, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { quizFeature, userFeature } from 'src/app/store/features';
import { UserActions } from 'src/app/store/actions';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ ButtonModule, CardModule ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  @Input() userId = '';
  private readonly store = inject(Store);
  vm = this.store.selectSignal(userFeature.selectUserState);
  selectQuizLookups = this.store.selectSignal(quizFeature.selectQuizLookups);

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser({userId: this.userId}));
    console.log(this.vm());
    console.log(this.selectQuizLookups());
  }
}

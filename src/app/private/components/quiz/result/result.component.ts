import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { QuizActions } from 'src/app/store/actions';
import { quizFeature } from 'src/app/store/features';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  @Input() quizId = '';
  private readonly store = inject(Store);
  quiz = this.store.selectSignal(quizFeature.selectQuiz);
  succeed = computed(() => (this.quiz()!.result! >= +this.quiz()!.passValue));

  ngOnInit(): void {
    this.store.dispatch(QuizActions.getQuiz({quizId: this.quizId}))
  }
}

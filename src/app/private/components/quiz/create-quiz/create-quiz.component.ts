import { Component, OnInit, inject, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { QuestionType } from 'src/app/private/enums';
import { Quiz } from 'src/app/private/interfaces';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { QuizActions } from 'src/app/store/actions';

import { quizFeature } from 'src/app/store/features';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ ReactiveFormsModule, ValidationMessagesComponent, ButtonModule, InputNumberModule  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
})
export class CreateQuizComponent implements OnInit {
  quizId = input('');
  private readonly store = inject(Store);
  vm = this.store.selectSignal(quizFeature.selectQuizState);
  title = this.quizId() ? 'Quiz Detail' : 'Create Quiz';
  answerGroup = new FormGroup({
    answer: new FormControl<string | null>(null, { validators: [Validators.required] }),
    correctAnswer: new FormControl<boolean>(false),
  });
  questionGroup = new FormGroup({
    question: new FormControl<string | null>(null, { validators: [Validators.required] }),
    type: new FormControl<QuestionType>(QuestionType.single),
    answers: new FormArray([this.answerGroup], Validators.required),
  });
  formCtrl = {
    name: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.maxLength(15)],
    }),
    timer: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    passValue: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    questions: new FormArray([this.questionGroup], Validators.required),
  };
  form = new FormGroup(this.formCtrl);

  get questions(): FormArray {
    return <FormArray>this.form.get('questions');
  }

  get answers(): FormArray {
    return <FormArray>this.questions.get('answers');
  }

  ngOnInit(): void {
    if (this.quizId()) {
      this.store.dispatch(QuizActions.getQuiz({ quizId: this.quizId()}));
      const quiz = this.vm().quiz as Quiz;
      console.log(quiz, 'aaaaaaaa');
      this.form.patchValue(quiz);
    }
    console.log(this.form);
  }

  addQuastion(): void {
    this.questions.push(this.questionGroup);
    this.form.updateValueAndValidity();
  }

  addAnswer(): void {
    this.answers.push(this.answerGroup);
    this.form.updateValueAndValidity();
  }

  deleteQuestion(): void {

  }

  deleteAnswer(): void {
    
  }

  changeNumber(value: string, control: FormControl) {
    control.setValue(value);
  }

  save(): void {

  }
}

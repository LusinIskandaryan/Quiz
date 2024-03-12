import {
  Component,
  Input,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

import { QuestionType, UserRole } from 'src/app/private/enums';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { PageMode } from 'src/app/shared/enums';
import { QuizActions } from 'src/app/store/actions';
import { appFeature, quizFeature } from 'src/app/store/features';
import { ValueTrimDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    ValueTrimDirective,
    ButtonModule,
    InputNumberModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    CardModule,
    CheckboxModule,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  @Input() quizId: string = '';
  private readonly store = inject(Store);
  vm = this.store.selectSignal(quizFeature.selectQuizState);
  currentUser = this.store.selectSignal(
    appFeature.selectCurrentUser
  );
  isAdmin = computed(() => this.currentUser()?.role === UserRole.admin);
  quiz = computed(() => this.vm().quiz);
  title = computed(() =>
    this.vm().pageMode === PageMode.Create ? 'Create Quiz' : 'Quiz Detail'
  );
  viewMode = computed(() => this.vm().pageMode === PageMode.View);
  pageMode = PageMode;
  questionTypes = [
    { name: 'Single', key: 'single', value: QuestionType.single },
    { name: 'Multiple', key: 'multiple', value: QuestionType.multiple },
  ];
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
    questions: new FormArray([this.newQuestion()], Validators.required),
  };
  form = new FormGroup(this.formCtrl);

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  questionGroup(questionIndex: number): FormGroup {
    return this.questions.at(questionIndex) as FormGroup;
  }

  questionGroupControl(questionIndex: number, controlName: string): FormControl {
    return this.questionGroup(questionIndex).get(controlName) as FormControl;
  }

  questionAnswers(questionIndex: number): FormArray {
    return this.questionGroup(questionIndex).get('answers') as FormArray;
  }

  questionAnswersControl(questionIndex: number, answerIndex: number, controlName: string): FormControl {
    return this.questionAnswers(questionIndex).at(answerIndex).get(controlName) as FormControl;
  }

  constructor() {
    effect(() => {
      if (this.quiz() && this.quizId) {
        const questions = this.quiz()?.questions;
        questions!.forEach((question, i: number) => {
          if (i !== 0) {
            this.addQuastion();
          }
          const answers = question.answers || [];
          answers.forEach((answerItem, j: number) => {
            if (j > 0) {
              this.addAnswer(i);
            }
            if (this.isAdmin()) {
              const control = this.questionAnswersControl(i, j, 'value');
              control.setValue(answerItem.correctAnswer);
            }
          });
        });
        this.form.patchValue(this.quiz()!);
      }
    });
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.store.dispatch(QuizActions.getQuiz({ quizId: this.quizId }));
    }
  }

  newQuestion(): FormGroup {
    return new FormGroup({
      question: new FormControl<string | null>(null, {
        validators: [Validators.required],
      }),
      type: new FormControl<QuestionType>(QuestionType.single),
      answers: new FormArray([this.newAnswers()], Validators.required),
    });
  }

  addQuastion(): void {
    this.questions.push(this.newQuestion());
    this.form.updateValueAndValidity();
  }

  removeQuestion(questionIndex: number): void {
    this.questions.removeAt(questionIndex);
  }

  newAnswers(): FormGroup {
    return new FormGroup({
      answer: new FormControl<string | null>(null),
      id: new FormControl<string | null>(null, {
        validators: [Validators.required],
      }),
      value: new FormControl<boolean>({value: false, disabled: false}),
      correctAnswer: new FormControl<boolean>(false),
    });
  }

  addAnswer(questionIndex: number): void {
    this.questionAnswers(questionIndex).push(this.newAnswers());
    this.form.updateValueAndValidity();
  }

  removeQuestionAnswer(questionIndex: number, answerIndex: number) {
    this.questionAnswers(questionIndex).removeAt(answerIndex);
  }

  changePageMode(event: MouseEvent, mode: PageMode): void {
    event.stopPropagation();
    this.store.dispatch(QuizActions.changePageMode({ mode }));
  }

  changeNumber(value: string, control: FormControl) {
    control.setValue(value);
    control.updateValueAndValidity();
  }

  changeQuestionType(event: RadioButtonClickEvent, questionIndex: number): void {
    this.questionGroup(questionIndex).get('type')?.setValue(event.value);
  }

  changeAnswer(event: CheckboxChangeEvent, control: FormControl): void {
    if (event.checked) {

    }
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    // if (this.form.valid) {
    // }
  }
}

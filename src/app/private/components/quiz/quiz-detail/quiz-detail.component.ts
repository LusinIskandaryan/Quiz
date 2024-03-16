import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

import { QuestionType, UserRole } from 'src/app/private/enums';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { PageMode } from 'src/app/shared/enums';
import { PassQuizActions, QuizActions } from 'src/app/store/actions';
import { appFeature, quizFeature } from 'src/app/store/features';
import { ValueTrimDirective } from 'src/app/shared/directives';
import { Question, Quiz } from 'src/app/private/interfaces';

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
    InputTextModule,
  ],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.scss',
})
export class QuizDetailComponent implements OnInit {
  @Input() quizId: string = '';
  private readonly store = inject(Store);
  vm = this.store.selectSignal(quizFeature.selectQuizState);
  quizTimer = this.store.selectSignal(quizFeature.selectQuizTimer);
  currentUser = this.store.selectSignal(appFeature.selectCurrentUser);
  questionIndex: WritableSignal<number> = signal(0);
  questionsLength: WritableSignal<number> = signal(1);
  isAdmin = computed(() => this.currentUser()?.role === UserRole.admin);
  quiz = computed(() => this.vm().quiz);
  showNextButton = computed(
    () => this.questionIndex() < this.questionsLength() - 1
  );
  showPreviousButton = computed(() => this.questionIndex() > 0);
  showAddRemoveButtons = computed(() => this.isAdmin() && !this.viewMode());
  submitButtonTitle = computed(() => (this.quizId ? 'Update' : 'Save'));
  title = computed(() =>
    this.vm().pageMode === PageMode.Create ? 'Create Quiz' : 'Quiz Detail'
  );
  questionCounTitle = computed(
    () =>
      `Question   ${this.questionIndex() + 1}  of  ${this.questionsLength()}`
  );
  viewMode = computed(() => this.vm().pageMode === PageMode.View);
  pageMode = PageMode;
  result = {};
  questionTypes = [
    { name: 'Single', key: 'single', value: QuestionType.single },
    { name: 'Multiple', key: 'multiple', value: QuestionType.multiple },
  ];
  type = QuestionType;
  formCtrl = {
    name: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.maxLength(15)],
    }),
    timer: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    result: new FormControl<number | null>(null),
    passValue: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    questions: new FormArray([this.newQuestion('1')], Validators.required),
  };
  form = new FormGroup(this.formCtrl);
  initialFormValue = this.form.getRawValue();
  initialAnswersValue = this.initialFormValue.questions[0]['answers'];

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  questionGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  questionControl(controlName: string): FormControl {
    return this.questionGroup(this.questionIndex()).get(
      controlName
    ) as FormControl;
  }

  answers(index: number): FormArray {
    return this.questionGroup(index).get('answers') as FormArray;
  }

  answersControl(
    controlName: string,
    answerIndex: number,
    questionIndex?: number
  ): FormControl {
    const index = questionIndex ?? this.questionIndex();
    return this.answers(index).at(answerIndex).get(controlName) as FormControl;
  }

  constructor() {
    effect(
      () => {
        const quiz = this.quiz();
        const questions = quiz?.questions || [];
        if (quiz && this.quizId) {
          this.form.patchValue(quiz);
          this.initForm(questions);
          this.setInitialValues();
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      if (this.viewMode()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    effect(() => {
      if (!this.quizTimer()) {
        this.save();
      }
    });
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.store.dispatch(QuizActions.getQuiz({ quizId: this.quizId }));
    }
  }

  private initForm(questions: Question[]): void {
    questions.forEach((question, i: number) => {
      if (i > this.questions.length - 1) {
        this.addQuastion();
      }
      this.questionGroup(i).patchValue(question);
      const answers = question.answers || [];
      answers.forEach((answerItem, j: number) => {
        if (j > this.answers(i).length - 1) {
          this.addAnswer(i);
        }
        this.answers(i).at(j).patchValue(answerItem);
        if (!this.isAdmin()) {
          const control = this.answersControl('correctAnswer', j, i);
          const newvalue = this.isAdmin() ? answerItem.correctAnswer : null;
          control.patchValue(newvalue);
        }
      });
    });
  }

  private setInitialValues(): void {
    this.questionsLength.set(this.questions.length);
    this.initialFormValue = this.form.getRawValue();
    this.initialAnswersValue = this.initialFormValue.questions[0]['answers'];
  }

  private newQuestion(index?: string): FormGroup {
    return new FormGroup({
      id: new FormControl<string | null>(index ?? null),
      question: new FormControl<string | null>(null, {
        validators: [Validators.required],
      }),
      value: new FormControl<number | null>(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      type: new FormControl<QuestionType>({
        value: QuestionType.single,
        disabled: !this.isAdmin(),
      }),
      answers: new FormArray([this.newAnswers('1')], Validators.required),
    });
  }

  private newAnswers(answerIndex?: string): FormGroup {
    return new FormGroup({
      id: new FormControl<string | null>(answerIndex ?? '1'),
      answer: new FormControl<string | null>(
        { value: null, disabled: this.viewMode() },
        Validators.required
      ),
      correctAnswer: new FormControl<boolean>({
        value: false,
        disabled: this.viewMode(),
      }),
    });
  }

  private addQuastion(index?: string): void {
    this.questions.push(this.newQuestion(index));
  }

  addQuastionGroup(event: MouseEvent): void {
    event.stopPropagation();
    const index = (this.questions.length + 1).toString();
    this.addQuastion(index);
    this.questionsLength.set(this.questions.length);
    this.form.updateValueAndValidity();
  }

  removeQuestion(event: MouseEvent): void {
    event.stopPropagation();
    this.questions.removeAt(this.questionIndex());
    this.questionsLength.set(this.questions.length);
    this.questionIndex.update((value) => value - 1);
    this.form.updateValueAndValidity();
  }

  private addAnswer(questionIndex: number, answerIndex?: string): void {
    this.answers(questionIndex).push(this.newAnswers(answerIndex));
  }

  addAnswerGroup(event: MouseEvent): void {
    event?.stopPropagation();
    const index = this.answers(this.questionIndex()).length + 1;
    this.addAnswer(this.questionIndex(), index.toString());
    this.answers(this.questionIndex())
      .at(index - 1)
      .markAllAsTouched();
    this.form.updateValueAndValidity();
  }

  removeAnswer(event: MouseEvent, answerIndex: number) {
    event.stopPropagation();
    this.answers(this.questionIndex()).removeAt(answerIndex);
  }

  changePageMode(event: MouseEvent, mode: PageMode): void {
    event.stopPropagation();
    this.store.dispatch(QuizActions.changePageMode({ mode }));
  }

  changeNumber(value: string, control: FormControl) {
    control.setValue(value);
    control.updateValueAndValidity();
  }

  sowPreviousPage(event: MouseEvent): void {
    event.stopPropagation();
    if (this.questionIndex() > 0) {
      this.questionIndex.update((value) => value - 1);
    }
  }

  showNextPage(event: MouseEvent): void {
    event.stopPropagation();
    if (this.questionIndex() < this.questions.length - 1) {
      this.questionIndex.update((value) => value + 1);
    }
  }

  changeAnswer(answerIndex: number) {
    const type = this.questionControl('type').getRawValue();
    this.generateQuizResult(answerIndex);
    if (type === QuestionType.single) {
      const answers = this.answers(this.questionIndex())
        .getRawValue()
        .map((el: any, index: number) =>
          answerIndex === index
            ? { ...el, correctAnswer: true }
            : { ...el, correctAnswer: false }
        );
      this.answers(this.questionIndex()).setValue(answers);
    }
  }

  private generateQuizResult(answerIndex: number): void {
    if (!this.isAdmin()) {
      const correctAnswer =
        this.quiz()?.questions[this.questionIndex()].answers[answerIndex]
          .correctAnswer;
      if (correctAnswer) {
        const value = this.questionControl('value').getRawValue();
        this.result = { ...this.result, [this.questionIndex()]: value };
      } else {
        this.result = { ...this.result, [this.questionIndex()]: 0 };
      }
    }
  }

  changeType(): void {
    this.answers(this.questionIndex()).patchValue(this.initialAnswersValue);
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = { ...this.form.getRawValue() } as Quiz;
      if (this.isAdmin()) {
        if (this.quizId) {
          data.id = this.quizId;
          this.store.dispatch(QuizActions.updateQuiz({ data }));
        } else {
          this.store.dispatch(QuizActions.createQuiz({ data }));
        }
        this.questionIndex.set(0);
      } else {
        this.passQuiz();
      }
    }
  }

  private passQuiz(): void {
    const data = { ...this.quiz() } as Quiz;
    const result = Object.values(this.result).reduce(
      (a: number, b: any) => a + b,
      0
    );
    data.result = result;
    this.store.dispatch(PassQuizActions.passQuiz({ data }));
  }
}

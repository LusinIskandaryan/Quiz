import {
  Component,
  Input,
  OnDestroy,
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

import { QuestionType, UserRole } from 'src/app/private/enums';
import { ValidationMessagesComponent } from 'src/app/shared/components';
import { PageMode } from 'src/app/shared/enums';
import { QuizActions } from 'src/app/store/actions';
import { appFeature, quizFeature } from 'src/app/store/features';
import { ValueTrimDirective } from 'src/app/shared/directives';
import { Quiz } from 'src/app/private/interfaces';

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
  // TODO form error class
  // TODO add view mode class, for disable imputs, for hide icons
  // TODO discard changes
  // TODO refresh page navigate to quiz  list
  // TODO mtacel quiz Type changi xndir@
  // TODO remove question@ submita anum
  // TODO start
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
  viewMode = computed(() => this.vm().pageMode === PageMode.View);
  pageMode = PageMode;
  questionTypes = [
    { name: 'Single', key: 'single', value: QuestionType.single },
    { name: 'Multiple', key: 'multiple', value: QuestionType.multiple },
  ];
  type = QuestionType;
  formCtrl = {
    // id: new FormControl<string | null>(null),
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
  initialFormValue = this.form.value;
  initialAnswersValue = this.initialFormValue.questions![0].answers;

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  questionGroup(questionIndex: number): FormGroup {
    return this.questions.at(questionIndex) as FormGroup;
  }

  questionGroupControl(
    questionIndex: number,
    controlName: string
  ): FormControl {
    return this.questionGroup(questionIndex).get(controlName) as FormControl;
  }

  questionAnswers(questionIndex: number): FormArray {
    return this.questionGroup(questionIndex).get('answers') as FormArray;
  }

  questionAnswersControl(
    questionIndex: number,
    answerIndex: number,
    controlName: string
  ): FormControl {
    return this.questionAnswers(questionIndex)
      .at(answerIndex)
      .get(controlName) as FormControl;
  }

  constructor() {
    effect(
      () => {
        const quiz = this.quiz();
        const questions = quiz?.questions || [];
        if (quiz && this.quizId) {
          this.form.patchValue(quiz);
          questions.forEach((question, i: number) => {
            if (i > this.questions.length - 1) {
              this.addQuastion();
            }
            this.questionGroup(i).patchValue(question);
            const answers = question.answers || [];
            answers.forEach((answerItem, j: number) => {
              if (j > this.questionAnswers(i).length - 1) {
                this.addAnswer(i);
              }
              this.questionAnswers(i).at(j).patchValue(answerItem);
              if (!this.isAdmin()) {
                const control = this.questionAnswersControl(
                  i,
                  j,
                  'correctAnswer'
                );
                const newvalue = this.isAdmin()
                  ? answerItem.correctAnswer
                  : null;
                control.patchValue(newvalue);
              }
            });
          });
          this.questionsLength.set(this.questions.length);
          this.questionIndex.set(0);
          this.initialFormValue = this.form.value;
          this.initialAnswersValue =
            this.initialFormValue.questions![0].answers;
          if (!this.quizTimer()) {
            this.save();
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.store.dispatch(QuizActions.getQuiz({ quizId: this.quizId }));
      if (!this.isAdmin()) {
        this.store.dispatch(QuizActions.startTimer());
      }
    }
  }

  newQuestion(questionIndex?: string): FormGroup {
    return new FormGroup({
      id: new FormControl<string | null>(questionIndex ?? null),
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
      answers: new FormArray([this.newAnswers()], Validators.required),
    });
  }

  addQuastion(questionIndex?: string): void {
    this.questions.push(this.newQuestion(questionIndex));
  }

  removeQuestion(event: MouseEvent): void {
    event.stopPropagation();
    this.questions.removeAt(this.questionIndex());
    this.form.updateValueAndValidity();
    this.questionsLength.set(this.questions.length);
    this.questionIndex.update((value) => value - 1);
  }

  newAnswers(answerIndex?: string): FormGroup {
    return new FormGroup({
      id: new FormControl<string | null>(answerIndex ?? null),
      answer: new FormControl<string | null>(null, Validators.required),
      correctAnswer: new FormControl<boolean>(false),
    });
  }

  addAnswer(questionIndex: number, answerIndex?: string): void {
    this.questionAnswers(questionIndex).push(this.newAnswers(answerIndex));
  }

  removeQuestionAnswer(
    event: MouseEvent,
    questionIndex: number,
    answerIndex: number
  ) {
    event.stopPropagation();
    this.questionAnswers(questionIndex).removeAt(answerIndex);
    // this.initialAnswersValue = this.form.value.questions![this.questionIndex()].answers;
  }

  addNewQuastion(event: MouseEvent): void {
    event.stopPropagation();
    const questionIndex = (this.questions.length + 1).toString();
    this.addQuastion(questionIndex);
    this.questionsLength.set(this.questions.length);
    this.form.updateValueAndValidity();
    // this.initialAnswersValue = this.form.value.questions![this.questionIndex()].answers;
  }

  addNewAnswer(event: MouseEvent): void {
    debugger;
    event?.stopPropagation();
    const answerIndex = (
      this.questionAnswers(this.questionIndex()).length + 1
    ).toString();
    this.addAnswer(this.questionIndex(), answerIndex);
    this.questionAnswers(this.questionIndex())
      .at(+answerIndex - 1)
      .markAllAsTouched();
    this.form.updateValueAndValidity();
    // this.initialAnswersValue = this.form.value.questions![this.questionIndex()].answers;
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
    // this.initialAnswersValue = this.initialFormValue.questions![this.questionIndex()].answers;
  }

  showNextPage(event: MouseEvent): void {
    event.stopPropagation();
    if (this.questionIndex() < this.questions.length - 1) {
      this.questionIndex.update((value) => value + 1);
    }
    // this.initialAnswersValue = this.initialFormValue.questions![this.questionIndex()].answers;
  }

  changeQuestionAnswer(answerIndex: number) {
    const answers = this.questionAnswers(this.questionIndex()).value.map(
      (el: any, index: number) =>
        answerIndex === index
          ? { ...el, correctAnswer: true }
          : { ...el, correctAnswer: false }
    );
    console.log(answers, 'changeQuestionAnswer');
    this.questionAnswers(this.questionIndex()).setValue(answers);
  }

  changeQuestionType(): void {
    this.questionAnswers(this.questionIndex()).patchValue(
      this.initialAnswersValue
    );
    console.log(this.questionAnswers(this.questionIndex()).value);
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (this.form.valid) {
      const data = { ...this.form.getRawValue() } as Quiz;
      if (this.isAdmin()) {
        if (this.quizId) {
          data.id = this.quizId;
          this.store.dispatch(QuizActions.updateQuiz({ data }));
        } else {
          this.store.dispatch(QuizActions.createQuiz({ data }));
        }
      } else {
        console.log('save');
        data.id = this.quizId;
        this.store.dispatch(QuizActions.passQuiz({ data }));
      }
    }
  }
}

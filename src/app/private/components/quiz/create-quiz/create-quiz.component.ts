import { Component, input } from '@angular/core';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss'
})
export class CreateQuizComponent {
  quizId = input('');
}

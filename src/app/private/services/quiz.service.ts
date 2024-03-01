import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { RequestResponse } from 'src/app/shared/interfaces';
import { Quiz, QuizLookups } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getQuiz(id: string): Observable<RequestResponse<Quiz>> {
    const url = `${this.baseUrl}/quiz/${id}`;
    // return this.http.get<RequestResponse<Quiz>>(url);
    return of({
        data: {
            id: '1',
            name: 'JS',
            timer: 1000,
            passWalue: 900,
            result: 700,
            questions: [],
          },
        message: '',
    });
  }

  getQuizLookups(): Observable<RequestResponse<QuizLookups[]>> {
    const url = `${this.baseUrl}/quiz/lookups`;
    // return this.http.get<RequestResponse<QuizLookups[]>>(url);
    return of({
      data: [
        {
          id: 1,
          label: 'JS',
        },
        {
          id: 2,
          label: 'React',
        },
        {
          id: 3,
          label: 'Angular',
        },
      ],
      message: '',
    });
  }

  createQuiz(data: Quiz): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/quiz/create`;
    return this.http.post<RequestResponse<string>>(url, data);
  }

  passQuiz(data: Quiz): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/quiz/pass`;
    return this.http.post<RequestResponse<string>>(url, data);
  }

  updateQuiz(data: Quiz): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/quiz/update`;
    return this.http.post<RequestResponse<string>>(url, data);
  }

  deleteQuiz(id: string): Observable<RequestResponse<boolean>> {
    const url = `${this.baseUrl}/quiz/delete/${id}`;
    return this.http.delete<RequestResponse<boolean>>(url);
  }

  getQuizList(): Observable<RequestResponse<Quiz[]>> {
    const url = `${this.baseUrl}/quiz/list`;
    // return this.http.get<RequestResponse<Quiz[]>>(url);
    return of({
      data: [
        {
          id: '1',
          name: 'JS',
          timer: 1000,
          passWalue: 900,
          result: 700,
          questions: [],
        },
        {
          id: '2',
          name: 'React',
          timer: 800,
          passWalue: 600,
          result: 600,
          questions: [],
        },
        {
          id: '3',
          name: 'Angular',
          timer: 800,
          passWalue: 1200,
          result: 1200,
          questions: [],
        },
      ],
      message: '',
    });
  }
}

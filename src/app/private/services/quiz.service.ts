import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { Quiz, Lookups } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getQuizList(): Observable<Quiz[]> {
    const url = `${this.baseUrl}/quiz`;
    return this.http.get<Quiz[]>(url);
  }

  getQuiz(id: string): Observable<Quiz> {
    const url = `${this.baseUrl}/quiz/${id}`;
    return this.http.get<Quiz>(url);
  }

  getQuizLookups(): Observable<Lookups[]> {
    const url = `${this.baseUrl}/lookups`;
    return this.http.get<Lookups[]>(url);
  }

  deleteQuiz(id: string): Observable<Quiz> {
    const url = `${this.baseUrl}/quiz/${id}`;
    return this.http.delete<Quiz>(url);
  }

  updateQuiz(data: Quiz): Observable<Quiz> {
    const url = `${this.baseUrl}/quiz/${data.id}`;
    return this.http.put<Quiz>(url, data);
  }

  createQuiz(data: Quiz): Observable<Quiz> {
    const url = `${this.baseUrl}/quiz`;
    return this.http.post<Quiz>(url, data);
  }

  passQuiz(data: Quiz): Observable<Quiz> {
    const url = `${this.baseUrl}/quiz/${data.id}`;
    return this.http.put<Quiz>(url, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { RequestResponse } from 'src/app/shared/interfaces';
import { Quiz } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getQuiz(id: string): Observable<RequestResponse<Quiz>> {
    const url = `${this.baseUrl}/quiz/${id}`;
    return this.http.get<RequestResponse<Quiz>>(url);
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
    return this.http.get<RequestResponse<Quiz[]>>(url);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BaseTable, List, RequestResponse } from 'src/app/shared/interfaces';
import { BASE_URL } from 'src/app/shared/api/tokens';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getCurrentUser(): Observable<RequestResponse<User>> {
    const url = `${this.baseUrl}/user/current`;
    // return this.http.get<RequestResponse<User>>(url);
    return of({
      data: {
        id: '1',
        email: 'lusi@gmail.com',
        role: 1,
        firstName: 'Lusy',
        quizIds: ['1', '3'],
      },
      message: '',
    });
  }

  getUser(id: string): Observable<RequestResponse<User>> {
    const url = `${this.baseUrl}/user/${id}`;
    // return this.http.get<RequestResponse<User>>(url);
    return of({
      data: {
        id: '1',
        email: 'cc@gmail.com',
        role: 1,
        firstName: 'cc',
        quizIds: ['1', '3'],
      },
      message: '',
    });
  }

  updateUser(data: User): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/update`;
    return this.http.post<RequestResponse<string>>(url, data);
  }

  getUserList(data: BaseTable): Observable<RequestResponse<List<User[]>>> {
    const url = `${this.baseUrl}/user/list`;
    // return this.http.post<RequestResponse<User[]>>(url, data);
    return of({
      data: {
        pageNumber: 1,
        pageSize: 5,
        totalCount: 3,
        items: [
          {
            id: '1',
            email: 'aa@gmail.com',
            role: 0,
            firstName: 'aa',
            quizIds: ['1', '2', '3'],
          },
          {
            id: '2',
            email: 'bb@gmail.com',
            role: 1,
            firstName: 'bb',
            quizIds: ['1', '3'],
          },
          {
            id: '3',
            email: 'cc@gmail.com',
            role: 0,
            firstName: 'cc',
            quizIds: ['2', '3'],
          },
        ],
      },
      message: '',
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { RequestResponse } from 'src/app/shared/interfaces';
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
    return this.http.get<RequestResponse<User>>(url);
  }

  getUser(id: string): Observable<RequestResponse<User>> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.get<RequestResponse<User>>(url);
  }

  updateUser(data: User): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/update`;
    return this.http.post<RequestResponse<string>>(url, data);
  }

  getUserList(): Observable<RequestResponse<User[]>> {
    const url = `${this.baseUrl}/user/list`;
    return this.http.get<RequestResponse<User[]>>(url);
  }
}


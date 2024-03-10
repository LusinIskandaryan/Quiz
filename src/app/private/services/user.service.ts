import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getCurrentUser(id: string): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  getUserList(id: string): Observable<User[]> {
    const params = `?id_ne=${id}`;
    const url = `${this.baseUrl}/users${params}`;
    return this.http.get<User[]>(url);
  }

  getUser(id: string): Observable<User> {
    const params = '';
    const url = `${this.baseUrl}/users/${id}${params}`;
    return this.http.get<User>(url);
  }

  updateUser(data: User): Observable<User> {
    const url = `${this.baseUrl}/users/${data.id}`;
    return this.http.put<User>(url, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api';
import { RequestResponse } from 'src/app/shared/interfaces';
import { User } from 'src/app/private/interfaces';
import { UserLogin, UserRegister } from '../../../public/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  login(data: UserLogin): Observable<User[]> {
    const url = `${this.baseUrl}/users?email=${data.email}&password=${data.password}`;
    return this.http.get<User[]>(url);
  }

  logout(): Observable<RequestResponse<string>> {
    return of({data: 'true', message: ''});
  }

  registerUser(data: UserRegister): Observable<UserRegister> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<UserRegister>(url, data);
  }
}

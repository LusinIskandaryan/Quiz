import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api';
import { RequestResponse } from 'src/app/shared/interfaces';
import { UserLogin } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  login(data: UserLogin): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/login`;
    // return this.http.post<RequestResponse<string>>(url, data);
    return of({data: 'true', message: 'You are successfully login'});
  }

  logout(): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/logout`;
    // return this.http.get<RequestResponse<string>>(url);
    return of({data: 'true', message: 'You are successfully logout'});
  }
}

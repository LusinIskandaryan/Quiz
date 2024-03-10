import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { UserRegister } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  registerUser(data: UserRegister): Observable<UserRegister> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<UserRegister>(url, data);
  }
}

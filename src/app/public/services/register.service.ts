import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { RequestResponse } from 'src/app/shared/interfaces';
import { UserRegister } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  registerUser(data: UserRegister): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/register`;
    // return this.http.post<RequestResponse<string>>(url, data);
    return of({data: 'true', message: 'You are successfully registered'});
  }
}

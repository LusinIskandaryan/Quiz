import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/private/interfaces';
import { BASE_URL } from 'src/app/shared/api/tokens';
import { RequestResponse } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  registerUser(data: User): Observable<RequestResponse<string>> {
    const url = `${this.baseUrl}/user/register`;
    return this.http.post<RequestResponse<string>>(url, data);
  }
}

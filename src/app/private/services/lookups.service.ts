import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/shared/api/tokens';
import { Lookups } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  getQuizLookups(): Observable<Lookups[]> {
    const url = `${this.baseUrl}/lookups`;
    return this.http.get<Lookups[]>(url);
  }

  addQuizInLookups(data: Lookups): Observable<Lookups> {
    const url = `${this.baseUrl}/lookups`;
    return this.http.post<Lookups>(url, data);
  }

  deleteQuizFromLookups(id: string): Observable<Lookups> {
    const url = `${this.baseUrl}/lookups/${id}`;
    return this.http.delete<Lookups>(url);
  }

}


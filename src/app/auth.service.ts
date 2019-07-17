import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseURL + '/auth';

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      ...credentials
    });
  }
}

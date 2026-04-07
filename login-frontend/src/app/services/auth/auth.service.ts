import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginData, LoginResponseData, RegisterData, RegisterResponseData, User } from '../../models/auth.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.URL_API_BASE

  constructor(private http: HttpClient) {
  }
  loginService(data: LoginData): Observable<LoginResponseData> {
    return this.http.post<LoginResponseData>(`${this.apiURL}${environment.URL_API_LOGIN}`, { username: data.username, password: data.password })
  }

  registerService(data: RegisterData): Observable<RegisterResponseData> {
    return this.http.post<RegisterResponseData>(`${this.apiURL}${environment.URL_API_REGISTER}`, { username: data.username, email: data.email, password: data.password })
  }
  getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.get<User>(`${this.apiURL}${environment.URL_API_PROFILE}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
  }


  logout() {
    localStorage.removeItem('token');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData, LoginResponseData, RegisterData, RegisterResponseData } from '../../models/auth.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.URL_API_BASE
  constructor(private http: HttpClient) { }
  loginService(data: LoginData): Observable<LoginResponseData> {
    return this.http.post<LoginResponseData>(`${this.apiURL}${environment.URL_API_LOGIN}`, { username: data.username, password: data.password })
  }

  registerService(data: RegisterData): Observable<RegisterResponseData> {
    return this.http.post<RegisterResponseData>(`${this.apiURL}${environment.URL_API_REGISTER}`, { username: data.username, email: data.email, password: data.password })
  }
}

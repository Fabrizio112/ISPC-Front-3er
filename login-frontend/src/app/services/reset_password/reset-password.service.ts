import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiURL = environment.URL_API_BASE;
  private sendCodeURL = environment.URL_API_REQUEST_OTP;
  private verifyCodeURL = environment.URL_API_VERIFY_OTP;
  private resetPasswordURL = environment.URL_API_RESET_PASSWORD;

  constructor(private http: HttpClient) { }

  sendCode(email: string) {
    return this.http.post(`${this.apiURL}${this.sendCodeURL}`, { email });
  }
  verifyCode(email: string, code: string) {
    return this.http.post(`${this.apiURL}${this.verifyCodeURL}`, { email, code });
  }
  resetPassword(email: string, newPassword: string, code: string) {
    return this.http.post(`${this.apiURL}${this.resetPasswordURL}`, { email, new_password: newPassword, code });
  }
}

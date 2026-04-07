import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  statusForm: 'login' | 'register' = 'login';

  changeStatusForm(status: 'login' | 'register') {
    this.statusForm = status;
  }
}

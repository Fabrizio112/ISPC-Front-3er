import { Component, signal } from '@angular/core';
import { FormService } from './services/form/form.service';
import { Login } from './login/login';
import { Register } from './register/register';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('login-frontend');

  constructor(public formService: FormService) { }
}

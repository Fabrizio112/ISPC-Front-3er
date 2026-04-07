import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'forgot-password', component: ResetPassword },
  { path: '**', redirectTo: 'login' }
];

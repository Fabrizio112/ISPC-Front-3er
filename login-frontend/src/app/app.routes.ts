import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { ResetPassword } from './reset-password/reset-password';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'register', component: Register, canActivate: [publicGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'forgot-password', component: ResetPassword, canActivate: [publicGuard] },
  { path: '**', redirectTo: 'login' }
];

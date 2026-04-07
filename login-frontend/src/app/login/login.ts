import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormService } from '../services/form/form.service';
import { AuthService } from '../services/auth/auth.service';
import { Loader } from '../components/loader/loader';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, Loader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public isLoading: boolean = false;

  constructor(public formService: FormService, public authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;
      this.authService.loginService({ username, password }).pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges(); // 👈 forzás que Angular procese el cambio ANTES de que Swal aparezca
      })).subscribe({
        next: (response) => {
          localStorage.setItem('token', JSON.stringify(response.access));
          localStorage.setItem('refreshToken', JSON.stringify(response.refresh));
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: (error) => {
          Swal.fire('Error', 'Login failed. Please check your credentials and try again.', 'error');
        }
      });
    }
  }
}

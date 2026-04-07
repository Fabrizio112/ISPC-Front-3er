import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormService } from '../services/form/form.service';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Loader } from '../components/loader/loader';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, Loader],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  public isLoading: boolean = false;

  constructor(public formService: FormService, public authService: AuthService) { }

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { username, email, password } = this.registerForm.value;
      this.authService.registerService({ username, email, password }).
        pipe(finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })).subscribe({
          next: (response) => {
            Swal.fire('Success', 'Registration successful!', 'success');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            Swal.fire('Error', 'Registration failed. Please try again.', 'error');
          }
        });
    }
  }
}
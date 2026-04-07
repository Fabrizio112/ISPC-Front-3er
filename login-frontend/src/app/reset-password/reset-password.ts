import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Loader } from '../components/loader/loader';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { ResetPasswordService } from '../services/reset_password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, Loader, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  public step: number = 1;
  public isLoading: boolean = false;
  public email: string = '';

  emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  otpForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });
  constructor(private resetPasswordService: ResetPasswordService) { }

  sendCode() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.email = this.emailForm.value.email;
      this.resetPasswordService.sendCode(this.email)
        .pipe(finalize(() => { this.isLoading = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => { this.step = 2; },
          error: () => { Swal.fire('Error', 'No account found with that email', 'error'); }
        });
    }
  }

  verifyCode() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.resetPasswordService.verifyCode(this.email, this.otpForm.value.code)
        .pipe(finalize(() => { this.isLoading = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => {
            this.step = 3;
          },
          error: () => { Swal.fire('Error', 'Invalid or expired code', 'error'); }
        });
    }
  }

  resetPassword() {
    if (this.passwordForm.invalid) return;

    const { password, confirmPassword } = this.passwordForm.value;

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    this.isLoading = true;

    this.resetPasswordService.resetPassword(this.email, password, this.otpForm.value.code)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Password updated!', 'success')
            .then(() => this.router.navigate(['/login']));
        },
        error: () => {
          Swal.fire('Error', 'Could not reset password', 'error');
        }
      });
  }
}
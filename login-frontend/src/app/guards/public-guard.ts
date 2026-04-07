import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'You are already logged in.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    router.navigate(['/home']);
    return false;
  }
  return true;
};

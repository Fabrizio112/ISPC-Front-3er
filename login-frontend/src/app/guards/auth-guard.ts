import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Please log in to continue.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    router.navigate(['/login']);
    return false;
  }


  return true;
};

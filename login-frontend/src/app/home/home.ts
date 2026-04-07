import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/auth.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Loader } from '../components/loader/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Loader, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public user: User | null = null;
  public isLoading: boolean = true;
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error("Error fetching profile:", error);
      }
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

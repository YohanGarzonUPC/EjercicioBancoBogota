import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Si ya está autenticado, redirigir al dashboard
    if (this.authService.obtenerToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.error = error.error.error || 'Error al iniciar sesión';
        }
      });
  }
}
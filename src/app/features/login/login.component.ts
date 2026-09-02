import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-4">
          <div class="card shadow">
            <div class="card-body">
              <h3 class="text-center mb-4">SIMS Login</h3>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" [value]="email" placeholder="admin@sims.com" (input)="email = $any($event.target).value" />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input class="form-control" type="password" [value]="password" placeholder="admin123" (input)="password = $any($event.target).value" (keyup.enter)="login()" />
              </div>
              <button class="btn btn-primary w-100" (click)="login()" [disabled]="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
              <div *ngIf="error" class="alert alert-danger mt-3">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = 'admin@sims.com';
  password = 'admin123';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('role', res.role);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/core/services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   template: `
//   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//     <div class="container-fluid">
//       <a class="navbar-brand" routerLink="/dashboard">📦SIMS </a>
//       <div class="navbar-nav ms-auto">
//         <span class="navbar-text text-white me-3" *ngIf="auth.getEmail()">
//           👤 {{ auth.getEmail }}
//         </span>
//         <button class="btn btn-outline-light" (click)="logout()">Logout</button>
//       </div>
//     </div>
//   </nav>
//   `
// })
// export class NavbarComponent {
//   constructor(public auth: AuthService, private router: Router) {}

//   logout() {
//     this.auth.logout();
//     this.router.navigate(['/login']);
//   }
// }

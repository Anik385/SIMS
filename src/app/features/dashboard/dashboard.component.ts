import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductResponse } from '../../shared/models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  lowStockCount = 0;
  totalValue = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts(0, 100).subscribe({
      next: (page) => {
        this.totalProducts = page.totalElements;
        this.lowStockCount = page.content.filter((p: ProductResponse) => p.quantity <= p.reorderThreshold).length;
        this.totalValue = page.content.reduce((sum: number, p: ProductResponse) => sum + (p.price * p.quantity), 0);
      }
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../core/services/product.service';
// import { ProductResponse } from 'src/app/shared/models/product';

// @Component({
//   selector: 'app-dashboard',
//   template: `
//     <app-navbar></app-navbar>
//     <div class="container mt-4">
//       <h2>📊 Dashboard</h2>
//       <div class="row mt-4">
//         <div class="col-md-4">
//           <div class="card text-white bg-primary">
//             <div class="card-body">
//               <h5 class="card-title">Total Products</h5>
//               <p class="card-text display-6">{{ totalProducts }}</p>
//             </div>
//           </div>
//         </div>
//         <div class="col-md-4">
//           <div class="card text-white bg-warning">
//             <div class="card-body">
//               <h5 class="card-title">Low Stock Items</h5>
//               <p class="card-text display-6">{{ lowStockCount }}</p>
//             </div>
//           </div>
//         </div>
//         <div class="col-md-4">
//           <div class="card text-white bg-success">
//             <div class="card-body">
//               <h5 class="card-title">Total Value</h5>
//               <p class="card-text display-6">\${{ totalValue }}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="mt-4">
//         <h4>Quick Actions</h4>
//         <div class="d-flex gap-2">
//           <a class="btn btn-outline-primary" routerLink="/products">Manage Products</a>
//           <a class="btn btn-outline-success" routerLink="/stock">Adjust Stock</a>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class DashboardComponent implements OnInit {
//   totalProducts = 0;
//   lowStockCount = 0;
//   totalValue = 0;

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.productService.getProducts(0, 100).subscribe({
//       next: (page) => {
//         this.totalProducts = page.totalElements;
//         this.lowStockCount = page.content.filter((p: ProductResponse) => p.quantity <= p.reorderThreshold).length;
//         this.totalValue = page.content.reduce((sum: number, p: ProductResponse) => sum + (p.price * p.quantity), 0);
//       }
//     });
//   }
// }
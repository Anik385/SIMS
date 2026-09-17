import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReportService } from '../../core/services/report.service';
import {
  CategoryStock,
  DashboardStats,
  SalesTrend,
  TopSellingProduct
} from '../../shared/models/report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  topSelling: TopSellingProduct[] = [];
  lowStock: any[] = [];
  salesTrend: SalesTrend[] = [];

  // Chart 1: Sales Trend (Line)
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Revenue ($)',
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.15)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Sales Trend (Last 7 Days)' }
    }
  };

  // Chart 2: Top Selling (Bar)
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Units Sold',
        backgroundColor: '#10b981'
      }
    ]
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Top Selling Products' }
    }
  };

  // Chart 3: Category Stock (Doughnut)
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [
      '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'
    ] }]
  };
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Stock by Category' }
    }
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadStats();
    this.loadTopSelling();
    this.loadSalesTrend();
    this.loadCategoryStock();
    this.loadLowStock();
  }

  loadStats() {
    this.reportService.getDashboardStats().subscribe(data => this.stats = data);
  }

  loadTopSelling() {
    this.reportService.getTopSelling(5).subscribe(data => {
      this.topSelling = data;
      this.barChartData = {
        labels: data.map(p => p.productName),
        datasets: [{
          data: data.map(p => p.totalQuantitySold),
          label: 'Units Sold',
          backgroundColor: '#10b981'
        }]
      };
    });
  }

  loadSalesTrend() {
    this.reportService.getSalesTrend(7).subscribe(data => {
      this.salesTrend = data;
      this.lineChartData = {
        labels: data.map(s => s.period),
        datasets: [{
          data: data.map(s => s.revenue),
          label: 'Revenue ($)',
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          fill: true,
          tension: 0.4
        }]
      };
    });
  }

  loadCategoryStock() {
    this.reportService.getCategoryStock().subscribe(data => {
      this.doughnutChartData = {
        labels: data.map(c => c.categoryName),
        datasets: [{
          data: data.map(c => c.totalStock),
          backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4']
        }]
      };
    });
  }

  loadLowStock() {
    this.reportService.getLowStock().subscribe(data => this.lowStock = data);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../core/services/product.service';
// import { ProductResponse } from '../../shared/models/product.model';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html'
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
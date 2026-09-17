import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { StockComponent } from './features/stock/stock.component';
import { UsersComponent } from './features/users/users.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { LocationsComponent } from './features/locations/locations.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { PurchaseOrdersComponent } from './features/purchase-orders/purchase-orders.component';
import { PurchaseOrderDetailComponent } from './features/purchase-order-detail/purchase-order-detail.component';
import { SalesComponent } from './features/sales/sales.component';
import { CustomersComponent } from './features/customers/customers.component';
import { ReportsComponent } from './features/reports/reports.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'stock', component: StockComponent, canActivate: [authGuard] },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: '/dashboard' }
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'locations', component: LocationsComponent, canActivate: [authGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [authGuard] },
  { path: 'purchase-orders', component: PurchaseOrdersComponent, canActivate: [authGuard] },
  { path: 'purchase-orders/:id', component: PurchaseOrderDetailComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [authGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
  // { path: '', redirectTo: '/login', pathMatch: 'full' },   // ← changed to login
  // { path: '**', redirectTo: '/login' }                     // ← also change this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
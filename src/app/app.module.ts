import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { StockComponent } from './features/stock/stock.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductModalComponent } from './shared/components/product-modal/product-modal.component';
import { UsersComponent } from './features/users/users.component';
import { UserModalComponent } from './shared/components/user-modal/user-modal.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { LocationsComponent } from './features/locations/locations.component';
import { CategoryModalComponent } from './shared/components/category-modal/category-modal.component';
import { LocationModalComponent } from './shared/components/location-modal/location-modal.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { PurchaseOrdersComponent } from './features/purchase-orders/purchase-orders.component';
import { SupplierModalComponent } from './shared/components/supplier-modal/supplier-modal.component';
import { PoModalComponent } from './shared/components/po-modal/po-modal.component';
import { PurchaseOrderDetailComponent } from './features/purchase-order-detail/purchase-order-detail.component';
import { CustomersComponent } from './features/customers/customers.component';
import { SalesComponent } from './features/sales/sales.component';
import { SaleDetailComponent } from './features/sale-detail/sale-detail.component';
import { CustomerModalComponent } from './shared/components/customer-modal/customer-modal.component';
import { SaleModalComponent } from './shared/components/sale-modal/sale-modal.component';
import { ReportsComponent } from './features/reports/reports.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    StockComponent,
    NavbarComponent,
    ProductModalComponent,
    UsersComponent,
    UserModalComponent,
    UsersComponent,
    UserModalComponent,
    CategoriesComponent,
    LocationsComponent,
    CategoryModalComponent,
    LocationModalComponent,
    SuppliersComponent,
    PurchaseOrdersComponent,
    SupplierModalComponent,
    PoModalComponent,
    PurchaseOrderDetailComponent,
    CustomersComponent,
    SalesComponent,
    SaleDetailComponent,
    CustomerModalComponent,
    SaleModalComponent,
    ReportsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true
    }),
    ZXingScannerModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
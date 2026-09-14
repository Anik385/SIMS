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
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// Features
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { StockComponent } from './features/stock/stock.component';  // ← Ensure this import

// Shared
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductModalComponent } from './shared/components/product-modal/product-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    StockComponent,        // ← MUST be declared here
    NavbarComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000
    }),
    ZXingScannerModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }
}
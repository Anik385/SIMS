import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageResponse, ProductRequest, ProductResponse } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 0, size: number = 10): Observable<PageResponse<ProductResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<ProductResponse>>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  // ✅ ADD THIS METHOD
  getProductBySku(sku: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/sku/${sku}`);
  }

  createProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { PageResponse, ProductRequest, ProductResponse } from 'src/app/shared/models/product';

// @Injectable({ providedIn: 'root' })
// export class ProductService {
//   private apiUrl = `${environment.apiUrl}/products`;

//   constructor(private http: HttpClient) {}

//   getProducts(page: number = 0, size: number = 10): Observable<PageResponse<ProductResponse>> {
//     const params = new HttpParams().set('page', page).set('size', size);
//     return this.http.get<PageResponse<ProductResponse>>(this.apiUrl, { params });
//   }

//   getProductById(id: number): Observable<ProductResponse> {
//     return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
//   }

//   // ✅ THIS METHOD WAS MISSING - ADD IT
//   getProductBySku(sku: string): Observable<ProductResponse> {
//     return this.http.get<ProductResponse>(`${this.apiUrl}/sku/${sku}`);
//   }

//   createProduct(product: ProductRequest): Observable<ProductResponse> {
//     return this.http.post<ProductResponse>(this.apiUrl, product);
//   }

//   updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
//     return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, product);
//   }

//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
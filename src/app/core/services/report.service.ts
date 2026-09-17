import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CategoryStock,
  DashboardStats,
  LowStockProduct,
  SalesTrend,
  TopSellingProduct
} from '../../shared/models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`);
  }

  getTopSelling(limit = 5): Observable<TopSellingProduct[]> {
    return this.http.get<TopSellingProduct[]>(`${this.apiUrl}/top-selling?limit=${limit}`);
  }

  getSalesTrend(days = 7): Observable<SalesTrend[]> {
    return this.http.get<SalesTrend[]>(`${this.apiUrl}/sales-trend?days=${days}`);
  }

  getCategoryStock(): Observable<CategoryStock[]> {
    return this.http.get<CategoryStock[]>(`${this.apiUrl}/category-stock`);
  }

  getLowStock(): Observable<LowStockProduct[]> {
    return this.http.get<LowStockProduct[]>(`${this.apiUrl}/low-stock`);
  }
}
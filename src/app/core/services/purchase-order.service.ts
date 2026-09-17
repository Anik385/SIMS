import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PurchaseOrderRequest,
  PurchaseOrderResponse,
  PurchaseOrderStatus
} from '../../shared/models/purchase-order.model';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PurchaseOrderResponse[]> {
    return this.http.get<PurchaseOrderResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<PurchaseOrderResponse> {
    return this.http.get<PurchaseOrderResponse>(`${this.apiUrl}/${id}`);
  }

  create(request: PurchaseOrderRequest): Observable<PurchaseOrderResponse> {
    return this.http.post<PurchaseOrderResponse>(this.apiUrl, request);
  }

  updateStatus(id: number, status: PurchaseOrderStatus): Observable<PurchaseOrderResponse> {
    return this.http.put<PurchaseOrderResponse>(`${this.apiUrl}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
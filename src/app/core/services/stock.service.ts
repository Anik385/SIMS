import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StockAdjustRequest, StockMovementResponse } from '../../shared/models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private apiUrl = `${environment.apiUrl}/stock`;

  constructor(private http: HttpClient) {}

  // ✅ ADD THIS METHOD
  adjustStock(request: StockAdjustRequest): Observable<StockMovementResponse> {
    return this.http.post<StockMovementResponse>(`${this.apiUrl}/adjust`, request);
  }
}
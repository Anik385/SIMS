import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SaleRequest, SaleResponse } from '../../shared/models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SaleResponse[]> {
    return this.http.get<SaleResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.apiUrl}/${id}`);
  }

  create(request: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(this.apiUrl, request);
  }

  refund(id: number): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.apiUrl}/${id}/refund`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
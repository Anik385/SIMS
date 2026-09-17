import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupplierRequest, SupplierResponse } from '../../shared/models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private apiUrl = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(this.apiUrl);
  }

  getActive(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(`${this.apiUrl}/active`);
  }

  create(request: SupplierRequest): Observable<SupplierResponse> {
    return this.http.post<SupplierResponse>(this.apiUrl, request);
  }

  update(id: number, request: SupplierRequest): Observable<SupplierResponse> {
    return this.http.put<SupplierResponse>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
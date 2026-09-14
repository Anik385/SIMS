import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationRequest, LocationResponse } from '../../shared/models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private apiUrl = `${environment.apiUrl}/locations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(this.apiUrl);
  }

  create(request: LocationRequest): Observable<LocationResponse> {
    return this.http.post<LocationResponse>(this.apiUrl, request);
  }

  update(id: number, request: LocationRequest): Observable<LocationResponse> {
    return this.http.put<LocationResponse>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
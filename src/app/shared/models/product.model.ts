export interface ProductRequest {
  sku: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  quantity: number;
  reorderThreshold: number;
  locationId?: number;
  categoryId?: number; 
}

export interface ProductResponse {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  reorderThreshold: number;
  locationId: number;
  locationDescription: string;
  categoryId?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
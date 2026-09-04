export interface ProductRequest {
  sku: string;
  name: string;
  description?: string;
  category?: string;          // ✅ correct spelling
  price: number;
  quantity: number;
  reorderThreshold: number;   // ✅ correct spelling
  locationId?: number;
}

export interface ProductResponse {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;          // ✅ correct spelling
  price: number;
  quantity: number;
  reorderThreshold: number;  // ✅ correct spelling
  locationId: number;
  locationDescription: string;
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
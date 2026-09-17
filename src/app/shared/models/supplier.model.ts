export interface SupplierRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  isActive?: boolean;
}

export interface SupplierResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  isActive: boolean;
  createdAt: string;
}
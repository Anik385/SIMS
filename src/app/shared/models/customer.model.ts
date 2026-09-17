export interface CustomerRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

export interface CustomerResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  isActive: boolean;
  createdAt: string;
}
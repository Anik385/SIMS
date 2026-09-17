export type PaymentMethod = 'CASH' | 'CARD' | 'ONLINE' | 'BANK_TRANSFER';
export type SaleStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'CANCELLED';

export interface SaleItemRequest {
  productId: number;
  quantity: number;
  unitPrice?: number;
}

export interface SaleRequest {
  customerId?: number;
  paymentMethod: PaymentMethod;
  discount?: number;
  tax?: number;
  notes?: string;
  items: SaleItemRequest[];
}

export interface SaleItemResponse {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleResponse {
  id: number;
  saleNumber: string;
  customerId: number;
  customerName: string;
  soldById: number;
  soldByName: string;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  notes: string;
  createdAt: string;
  items: SaleItemResponse[];
}
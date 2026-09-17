export type PurchaseOrderStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'RECEIVED'
  | 'CANCELLED';

export interface PurchaseOrderItemRequest {
  productId: number;
  quantity: number;
  unitPrice?: number;
}

export interface PurchaseOrderRequest {
  supplierId: number;
  expectedDelivery?: string;
  notes?: string;
  items: PurchaseOrderItemRequest[];
}

export interface PurchaseOrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PurchaseOrderResponse {
  id: number;
  orderNumber: string;
  supplierId: number;
  supplierName: string;
  status: PurchaseOrderStatus;
  totalAmount: number;
  notes: string;
  expectedDelivery: string;
  createdAt: string;
  items: PurchaseOrderItemResponse[];
}
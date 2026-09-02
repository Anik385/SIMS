export interface StockAdjustRequest {
  productId: number;
  delta: number;
  reason: 'RECEIVED' | 'SOLD' | 'ADJUSTED' | 'RETURNED' | 'LOST';
}

export interface StockMovementResponse {
  id: number;
  productId: number;
  userId: number;
  quantityChange: number;
  reason: string;
  notes: string;
  timestamp: string;
}
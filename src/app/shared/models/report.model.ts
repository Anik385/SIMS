export interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalSuppliers: number;
  totalSales: number;
  totalRevenue: number;
  todayRevenue: number;
  monthRevenue: number;
  lowStockCount: number;
  pendingPurchaseOrders: number;
}

export interface TopSellingProduct {
  productId: number;
  productName: string;
  sku: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface SalesTrend {
  period: string;
  saleCount: number;
  revenue: number;
}

export interface CategoryStock {
  categoryName: string;
  productCount: number;
  totalStock: number;
}

export interface LowStockProduct {
  productId: number;
  name: string;
  sku: string;
  quantity: number;
  reorderThreshold: number;
}
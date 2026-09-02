export interface ProductRequest {
    sku: String;
    name: String;
    description?: String;
    category?: String;
    price: number;
    quantity: number;
    recorderThreshold?: number;
    locationId?: number;
}
export interface ProductResponse {
    id: number;
    sku: String;
    name: String;
    description: String;
    caregory: String;
    price: number;
    quantity: number;
    reorderThreshold: number;
    locationId: number;
    locationDescription: String;
}

// For paginated response from Spring Boot
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    Last: boolean;
    empty: boolean;
}

export interface Product {
}

export interface LocationRequest {
  aisle: string;
  shelf?: string;
  bin?: string;
  description?: string;
}

export interface LocationResponse {
  id: number;
  aisle: string;
  shelf: string;
  bin: string;
  description: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
}

export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  fullName: string;
  role: Role;
}

export interface UpdateUserRequest {
  fullName: string;
  role: Role;
}
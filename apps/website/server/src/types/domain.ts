export type UserRole = "customer" | "admin";
export type OrderStatus = "pending" | "paid" | "packed" | "shipped" | "cancelled";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
}

export interface SafeUser {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  badge: string | null;
  bg: string;
  emoji: string;
  price_cents: number;
  stock: number;
  image_url: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total_cents: number;
  created_at: string;
  updated_at: string;
}

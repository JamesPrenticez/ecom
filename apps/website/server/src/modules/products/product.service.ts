import type { Product, ProductCategory, ProductStatus } from "@shared/models";
import db from "../../config/db";
import type { Product as DBProduct } from "../../types/domain";
import ApiError from "../../utils/ApiError";

export interface ProductInput {
  name: string;
  category: ProductCategory;
  desc: string;
  price: number;
  stock?: number;
  badge?: string;
  emoji: string;
  bg: string;
  status?: ProductStatus;
  slug?: string;
}

export interface ProductUpdateInput {
  name?: string;
  category?: ProductCategory;
  desc?: string;
  price?: number;
  stock?: number;
  badge?: string;
  emoji?: string;
  bg?: string;
  status?: ProductStatus;
  slug?: string;
}

function makeSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toProduct(row: DBProduct): Product {
  return {
    id: String(row.id),
    name: row.name,
    category: row.category as ProductCategory,
    desc: row.description ?? "",
    price: row.price_cents / 100,
    badge: row.badge ?? undefined,
    bg: row.bg,
    emoji: row.emoji,
    status: row.is_active ? "active" : "draft",
    stock: row.stock,
    createdAt: row.created_at,
  };
}

export function listPublicProducts(): Product[] {
  const rows = db.prepare(`
    SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC
  `).all() as DBProduct[];
  return rows.map(toProduct);
}

export function getPublicProduct(id: number): Product {
  const row = db.prepare(
    "SELECT * FROM products WHERE id = ? AND is_active = 1"
  ).get(id) as DBProduct | undefined;
  if (!row) throw new ApiError(404, "Product not found");
  return toProduct(row);
}

export function listAdminProducts(): Product[] {
  const rows = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all() as DBProduct[];
  return rows.map(toProduct);
}

export function getAdminProduct(id: number): Product {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as DBProduct | undefined;
  if (!row) throw new ApiError(404, "Product not found");
  return toProduct(row);
}

function getRawProduct(id: number): DBProduct {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as DBProduct | undefined;
  if (!row) throw new ApiError(404, "Product not found");
  return row;
}

export function createProduct(input: ProductInput): Product {
  const slug = input.slug || makeSlug(input.name);

  const result = db.prepare(`
    INSERT INTO products
    (name, slug, description, category, badge, bg, emoji, price_cents, stock, image_url, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    input.name,
    slug,
    input.desc || null,
    input.category,
    input.badge || null,
    input.bg,
    input.emoji,
    Math.round(input.price * 100),
    input.stock ?? 0,
    null,
    input.status === "draft" ? 0 : 1
  );

  return getAdminProduct(Number(result.lastInsertRowid));
}

export function updateProduct(id: number, input: ProductUpdateInput): Product {
  const current = getRawProduct(id);

  const next = {
    name: input.name ?? current.name,
    slug: input.slug ?? current.slug,
    description: input.desc !== undefined ? input.desc : current.description,
    category: input.category ?? current.category,
    badge: input.badge !== undefined ? (input.badge || null) : current.badge,
    bg: input.bg ?? current.bg,
    emoji: input.emoji ?? current.emoji,
    price_cents: input.price !== undefined ? Math.round(input.price * 100) : current.price_cents,
    stock: input.stock ?? current.stock,
    is_active: input.status !== undefined
      ? (input.status === "active" ? 1 : 0)
      : current.is_active,
  };

  db.prepare(`
    UPDATE products
    SET name = ?, slug = ?, description = ?, category = ?, badge = ?, bg = ?, emoji = ?,
        price_cents = ?, stock = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    next.name, next.slug, next.description, next.category, next.badge,
    next.bg, next.emoji, next.price_cents, next.stock, next.is_active, id
  );

  return getAdminProduct(id);
}

export function deleteProduct(id: number): void {
  getRawProduct(id);
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
}

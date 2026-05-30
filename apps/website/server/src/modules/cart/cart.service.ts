import db from "../../config/db";
import ApiError from "../../utils/ApiError";

interface ProductStockRow {
  id: number;
  stock: number;
  is_active: number;
}

interface CartItem {
  product_id: number;
  quantity: number;
  name: string;
  slug: string;
  price_cents: number;
  stock: number;
  image_url: string | null;
  line_total_cents: number;
}

export function getCart(userId: number) {
  const items = db.prepare(`
    SELECT
      ci.product_id,
      ci.quantity,
      p.name,
      p.slug,
      p.price_cents,
      p.stock,
      p.image_url,
      ci.quantity * p.price_cents AS line_total_cents
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `).all(userId) as CartItem[];

  const total_cents = items.reduce((sum, item) => sum + item.line_total_cents, 0);
  return { items, total_cents };
}

export function addItem(userId: number, productId: number, quantity: number) {
  const product = db.prepare(`
    SELECT id, stock, is_active
    FROM products
    WHERE id = ?
  `).get(productId) as ProductStockRow | undefined;

  if (!product || !product.is_active) throw new ApiError(404, "Product not found");
  if (quantity > product.stock) throw new ApiError(400, "Not enough stock");

  db.prepare(`
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, product_id)
    DO UPDATE SET
      quantity = quantity + excluded.quantity,
      updated_at = CURRENT_TIMESTAMP
  `).run(userId, productId, quantity);

  return getCart(userId);
}

export function updateItem(userId: number, productId: number, quantity: number) {
  const item = db.prepare(`
    SELECT product_id
    FROM cart_items
    WHERE user_id = ? AND product_id = ?
  `).get(userId, productId);

  if (!item) throw new ApiError(404, "Cart item not found");

  db.prepare(`
    UPDATE cart_items
    SET quantity = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ? AND product_id = ?
  `).run(quantity, userId, productId);

  return getCart(userId);
}

export function removeItem(userId: number, productId: number) {
  db.prepare(`
    DELETE FROM cart_items
    WHERE user_id = ? AND product_id = ?
  `).run(userId, productId);

  return getCart(userId);
}

export function clearCart(userId: number): void {
  db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(userId);
}

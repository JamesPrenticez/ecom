import db from "../../config/db";
import ApiError from "../../utils/ApiError";
import * as cartService from "../cart/cart.service";
import type { OrderStatus } from "../../types/domain";

interface AdminOrderRow {
  id: number;
  user_id: number;
  status: OrderStatus;
  total_cents: number;
  created_at: string;
  updated_at: string;
  customer_email: string;
}

interface OrderItemRow {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  unit_price_cents: number;
  quantity: number;
  line_total_cents: number;
}

export function getOrderForUser(orderId: number, userId: number) {
  const order = db.prepare(`
    SELECT *
    FROM orders
    WHERE id = ? AND user_id = ?
  `).get(orderId, userId);

  if (!order) throw new ApiError(404, "Order not found");

  const items = db.prepare(`
    SELECT *
    FROM order_items
    WHERE order_id = ?
  `).all(orderId) as OrderItemRow[];

  return { ...(order as object), items };
}

export function createOrderFromCart(userId: number) {
  const cart = cartService.getCart(userId);

  if (cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const create = db.transaction(() => {
    for (const item of cart.items) {
      if (item.quantity > item.stock) {
        throw new ApiError(400, `Not enough stock for ${item.name}`);
      }
    }

    const orderResult = db.prepare(`
      INSERT INTO orders (user_id, status, total_cents)
      VALUES (?, 'pending', ?)
    `).run(userId, cart.total_cents);

    const orderId = Number(orderResult.lastInsertRowid);

    const insertItem = db.prepare(`
      INSERT INTO order_items
      (order_id, product_id, product_name, unit_price_cents, quantity, line_total_cents)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const decrementStock = db.prepare(`
      UPDATE products
      SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    for (const item of cart.items) {
      insertItem.run(
        orderId,
        item.product_id,
        item.name,
        item.price_cents,
        item.quantity,
        item.line_total_cents
      );
      decrementStock.run(item.quantity, item.product_id);
    }

    cartService.clearCart(userId);
    return orderId;
  });

  return getOrderForUser(create(), userId);
}

export function listOrdersForUser(userId: number) {
  return db.prepare(`
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `).all(userId);
}

export function listAdminOrders(): AdminOrderRow[] {
  return db.prepare(`
    SELECT o.*, u.email AS customer_email
    FROM orders o
    JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC
  `).all() as AdminOrderRow[];
}

export function getAdminOrder(orderId: number) {
  const order = db.prepare(`
    SELECT o.*, u.email AS customer_email
    FROM orders o
    JOIN users u ON u.id = o.user_id
    WHERE o.id = ?
  `).get(orderId) as AdminOrderRow | undefined;

  if (!order) throw new ApiError(404, "Order not found");

  const items = db.prepare(`
    SELECT *
    FROM order_items
    WHERE order_id = ?
  `).all(orderId) as OrderItemRow[];

  return { ...order, items };
}

export function updateOrderStatus(orderId: number, status: OrderStatus) {
  getAdminOrder(orderId);

  db.prepare(`
    UPDATE orders
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, orderId);

  return getAdminOrder(orderId);
}

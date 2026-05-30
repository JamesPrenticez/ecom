import db from "../../config/db";
import type { SafeUser } from "../../types/domain";

export function listUsers(): SafeUser[] {
  return db.prepare(`
    SELECT id, email, role, created_at
    FROM users
    ORDER BY created_at DESC
  `).all() as SafeUser[];
}

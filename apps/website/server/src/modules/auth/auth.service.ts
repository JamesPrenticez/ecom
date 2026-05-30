import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../config/db";
import env from "../../config/env";
import ApiError from "../../utils/ApiError";
import type { SafeUser, User } from "../../types/domain";

interface Credentials {
  email: string;
  password: string;
}

function sanitizeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    created_at: user.created_at
  };
}

function createToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function register(input: Credentials) {
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(input.email);
  if (existing) throw new ApiError(409, "Email already registered");

  const passwordHash = bcrypt.hashSync(input.password, 10);

  const result = db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, 'customer')
  `).run(input.email, passwordHash);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid) as User;
  return { user: sanitizeUser(user), token: createToken(user) };
}

export function login(input: Credentials) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(input.email) as User | undefined;

  if (!user || !bcrypt.compareSync(input.password, user.password_hash)) {
    throw new ApiError(401, "Invalid email or password");
  }

  return { user: sanitizeUser(user), token: createToken(user) };
}

import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import ApiError from "../utils/ApiError";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, "Missing bearer token"));
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as Express.UserPayload;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

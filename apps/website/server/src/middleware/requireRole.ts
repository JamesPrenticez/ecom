import type { RequestHandler } from "express";
import type { UserRole } from "../types/domain";
import ApiError from "../utils/ApiError";

export function requireRole(role: UserRole): RequestHandler {
  return (req, _res, next) => {
    if (!req.user || req.user.role !== role) {
      return next(new ApiError(403, "Forbidden"));
    }

    next();
  };
}

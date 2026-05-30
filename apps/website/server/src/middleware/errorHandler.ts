import type { ErrorRequestHandler } from "express";
import ApiError from "../utils/ApiError";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const apiError = err instanceof ApiError ? err : null;
  const statusCode = apiError?.statusCode || 500;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      message: err instanceof Error ? err.message : "Internal server error",
      details: apiError?.details || null
    }
  });
};

export default errorHandler;

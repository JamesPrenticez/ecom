import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";
import ApiError from "../utils/ApiError";

export default function validate(schema: ZodSchema): RequestHandler<any, any, any, any> {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return next(new ApiError(400, "Validation failed", result.error.flatten()));
    }

    req.validated = result.data;
    next();
  };
}

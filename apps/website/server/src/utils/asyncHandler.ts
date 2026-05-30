import type { RequestHandler } from "express";

export default function asyncHandler<P extends Record<string, string> = Record<string, string>>(
  fn: RequestHandler<P>
): RequestHandler<P> {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

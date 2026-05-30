import type { RequestHandler } from "express";
import * as service from "./user.service";

export const list: RequestHandler = (_req, res) => {
  res.json({ users: service.listUsers() });
};

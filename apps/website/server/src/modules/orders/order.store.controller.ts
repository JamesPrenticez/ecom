import type { RequestHandler } from "express";
import * as service from "./order.service";

type IdParams = { id: string };

export const create: RequestHandler = (req, res) => {
  res.status(201).json({
    order: service.createOrderFromCart(req.user!.id)
  });
};

export const listMine: RequestHandler = (req, res) => {
  res.json({
    orders: service.listOrdersForUser(req.user!.id)
  });
};

export const getMine: RequestHandler<IdParams> = (req, res) => {
  res.json({
    order: service.getOrderForUser(Number(req.params.id), req.user!.id)
  });
};

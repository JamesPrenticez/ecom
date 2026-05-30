import type { RequestHandler } from "express";
import * as service from "./order.service";
import type { OrderStatus } from "../../types/domain";

type IdParams = { id: string };

export const list: RequestHandler = (_req, res) => {
  res.json({ orders: service.listAdminOrders() });
};

export const get: RequestHandler<IdParams> = (req, res) => {
  res.json({ order: service.getAdminOrder(Number(req.params.id)) });
};

export const updateStatus: RequestHandler<IdParams> = (req, res) => {
  const validated = req.validated as { body: { status: OrderStatus } };

  res.json({
    order: service.updateOrderStatus(Number(req.params.id), validated.body.status)
  });
};

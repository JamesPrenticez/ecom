import type { RequestHandler } from "express";
import * as service from "./cart.service";

type ProductIdParams = { productId: string };

function userId(req: Parameters<RequestHandler>[0]): number {
  return req.user!.id;
}

export const getCart: RequestHandler = (req, res) => {
  res.json({ cart: service.getCart(userId(req)) });
};

export const addItem: RequestHandler = (req, res) => {
  const validated = req.validated as {
    body: { product_id: number; quantity: number };
  };

  res.status(201).json({
    cart: service.addItem(userId(req), validated.body.product_id, validated.body.quantity)
  });
};

export const updateItem: RequestHandler<ProductIdParams> = (req, res) => {
  const validated = req.validated as { body: { quantity: number } };

  res.json({
    cart: service.updateItem(userId(req), Number(req.params.productId), validated.body.quantity)
  });
};

export const removeItem: RequestHandler<ProductIdParams> = (req, res) => {
  res.json({
    cart: service.removeItem(userId(req), Number(req.params.productId))
  });
};

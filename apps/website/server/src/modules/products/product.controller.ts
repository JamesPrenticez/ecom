import type { RequestHandler } from "express";
import * as service from "./product.service";

type IdParams = { id: string };

export const listPublic: RequestHandler = (_req, res) => {
  res.json({ products: service.listPublicProducts() });
};

export const getPublic: RequestHandler<IdParams> = (req, res) => {
  res.json({ product: service.getPublicProduct(Number(req.params.id)) });
};

export const listAdmin: RequestHandler = (_req, res) => {
  res.json({ products: service.listAdminProducts() });
};

export const getAdmin: RequestHandler<IdParams> = (req, res) => {
  res.json({ product: service.getAdminProduct(Number(req.params.id)) });
};

export const create: RequestHandler = (req, res) => {
  const validated = req.validated as { body: service.ProductInput };
  res.status(201).json({ product: service.createProduct(validated.body) });
};

export const update: RequestHandler<IdParams> = (req, res) => {
  const validated = req.validated as { body: service.ProductUpdateInput };
  res.json({ product: service.updateProduct(Number(req.params.id), validated.body) });
};

export const remove: RequestHandler<IdParams> = (req, res) => {
  service.deleteProduct(Number(req.params.id));
  res.status(204).send();
};

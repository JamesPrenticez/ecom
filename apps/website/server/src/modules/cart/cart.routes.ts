import express from "express";
import { z } from "zod";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./cart.controller";

const router = express.Router();

const addItemSchema = z.object({
  body: z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive()
  }),
  params: z.object({}),
  query: z.object({})
});

const updateItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().positive()
  }),
  params: z.object({
    productId: z.coerce.number().int().positive()
  }),
  query: z.object({})
});

const productIdSchema = z.object({
  body: z.object({}),
  params: z.object({
    productId: z.coerce.number().int().positive()
  }),
  query: z.object({})
});

router.get("/", asyncHandler(controller.getCart));
router.post("/items", validate(addItemSchema), asyncHandler(controller.addItem));
router.patch("/items/:productId", validate(updateItemSchema), asyncHandler(controller.updateItem));
router.delete("/items/:productId", validate(productIdSchema), asyncHandler(controller.removeItem));

export default router;

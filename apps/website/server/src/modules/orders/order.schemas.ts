import { z } from "zod";

export const orderIdSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  query: z.object({})
});

export const orderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "paid", "packed", "shipped", "cancelled"])
  }),
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  query: z.object({})
});

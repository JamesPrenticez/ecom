import { z } from "zod";

const CATEGORIES = ["Bundles", "Soap & Body Wash", "Hair", "Skin", "Shave"] as const;
const STATUSES = ["active", "draft"] as const;

const idParam = z.object({
  id: z.coerce.number().int().positive()
});

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    category: z.enum(CATEGORIES),
    desc: z.string().min(1),
    price: z.number().positive(),
    stock: z.number().int().nonnegative().default(0),
    badge: z.string().optional(),
    emoji: z.string().min(1),
    bg: z.string().min(1),
    status: z.enum(STATUSES).default("active"),
    slug: z.string().min(2).optional(),
  }),
  params: z.object({}),
  query: z.object({})
});

export const productUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    category: z.enum(CATEGORIES).optional(),
    desc: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    badge: z.string().optional(),
    emoji: z.string().min(1).optional(),
    bg: z.string().min(1).optional(),
    status: z.enum(STATUSES).optional(),
    slug: z.string().min(2).optional(),
  }),
  params: idParam,
  query: z.object({})
});

export const productIdSchema = z.object({
  body: z.object({}),
  params: idParam,
  query: z.object({})
});

import express from "express";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./product.controller";
import {
  productCreateSchema,
  productUpdateSchema,
  productIdSchema
} from "./product.schemas";

const router = express.Router();

router.get("/", asyncHandler(controller.listAdmin));
router.post("/", validate(productCreateSchema), asyncHandler(controller.create));
router.get("/:id", validate(productIdSchema), asyncHandler(controller.getAdmin));
router.patch("/:id", validate(productUpdateSchema), asyncHandler(controller.update));
router.delete("/:id", validate(productIdSchema), asyncHandler(controller.remove));

export default router;

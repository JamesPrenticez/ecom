import express from "express";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./order.admin.controller";
import { orderIdSchema, orderStatusSchema } from "./order.schemas";

const router = express.Router();

router.get("/", asyncHandler(controller.list));
router.get("/:id", validate(orderIdSchema), asyncHandler(controller.get));
router.patch("/:id/status", validate(orderStatusSchema), asyncHandler(controller.updateStatus));

export default router;

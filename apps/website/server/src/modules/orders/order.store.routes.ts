import express from "express";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./order.store.controller";
import { orderIdSchema } from "./order.schemas";

const router = express.Router();

router.post("/", asyncHandler(controller.create));
router.get("/", asyncHandler(controller.listMine));
router.get("/:id", validate(orderIdSchema), asyncHandler(controller.getMine));

export default router;

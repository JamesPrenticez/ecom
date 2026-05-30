import express from "express";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./product.controller";
import { productIdSchema } from "./product.schemas";

const router = express.Router();

router.get("/", asyncHandler(controller.listPublic));
router.get("/:id", validate(productIdSchema), asyncHandler(controller.getPublic));

export default router;

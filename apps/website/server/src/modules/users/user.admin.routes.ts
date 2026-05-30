import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./user.admin.controller";

const router = express.Router();

router.get("/", asyncHandler(controller.list));

export default router;

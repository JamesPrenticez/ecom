import express from "express";
import { z } from "zod";
import validate from "../../middleware/validate";
import asyncHandler from "../../utils/asyncHandler";
import * as controller from "./auth.controller";

const router = express.Router();

const credentialsSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  }),
  params: z.object({}),
  query: z.object({})
});

router.post("/register", validate(credentialsSchema), asyncHandler(controller.register));
router.post("/login", validate(credentialsSchema), asyncHandler(controller.login));

export default router;

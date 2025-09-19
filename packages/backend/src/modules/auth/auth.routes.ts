import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validateBody.middleware";
import asyncHandler from "../../utils/asyncHandler";
import { loginSchema, registerSchema } from "../../validation/auth.validation";
import { getMe, login, logout, register } from "./auth.controller";

const router: Router = Router();

router.route("/register").post(validateBody(registerSchema), asyncHandler(register));
router.route("/login").post(validateBody(loginSchema), asyncHandler(login));
router.route("/me").get(authMiddleware, asyncHandler(getMe));
router.route("/logout").post(authMiddleware, asyncHandler(logout));

export { router as AuthRouter };

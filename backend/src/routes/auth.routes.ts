import { Router } from "express";

import { login, logout, logoutAll, refreshToken, register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, logoutSchema, refreshTokenSchema, registerSchema } from "../validations/auth.validation.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

router.get(
  "/admin",
  protect,
  authorize("admin"),
  (_req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.post(
  "/refresh",
  validate(refreshTokenSchema),
  refreshToken
);

router.post(
  "/logout",
  validate(logoutSchema),
  logout
);

router.post(
  "/logout-all",
  protect,
  logoutAll
);

export default router;
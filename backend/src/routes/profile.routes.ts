import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { getMyProfile, updateProfile } from "../controllers/profile.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validations/profile.validation.js";

const router = Router();

router.get(
  "/me",
  protect,
  getMyProfile
);

router.patch(
  "/me",
  protect,
  validate(updateProfileSchema),
  updateProfile
);

export default router;
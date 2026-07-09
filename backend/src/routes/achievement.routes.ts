import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import {
    createAchievement,
    getAchievements,
    updateAchievement,
    deleteAchievement,
} from "../controllers/achievement.controller.js";

import {
    createAchievementSchema,
    updateAchievementSchema,
} from "../validations/achievement.validation.js";

import {
    paginationQuerySchema,
} from "../validations/query.validation.js";

const router = Router();

router.post(
    "/",
    protect,
    validate(createAchievementSchema),
    createAchievement
);

router.get(
    "/",
    protect,
    validateQuery(paginationQuerySchema),
    getAchievements
);

router.patch(
    "/:id",
    protect,
    validate(updateAchievementSchema),
    updateAchievement
);

router.delete(
    "/:id",
    protect,
    deleteAchievement
);

export default router;
import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import {
    createExperience,
    getExperience,
    updateExperience,
    deleteExperience,
} from "../controllers/experience.controller.js";

import {
    createExperienceSchema,
    updateExperienceSchema,
} from "../validations/experience.validation.js";

import {
    paginationQuerySchema,
} from "../validations/query.validation.js";

const router = Router();

router.post(
    "/",
    protect,
    validate(createExperienceSchema),
    createExperience
);

router.get(
    "/",
    protect,
    validateQuery(paginationQuerySchema),
    getExperience
);

router.patch(
    "/:id",
    protect,
    validate(updateExperienceSchema),
    updateExperience
);

router.delete(
    "/:id",
    protect,
    deleteExperience
);

export default router;
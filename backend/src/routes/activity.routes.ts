import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import { paginationQuerySchema } from "../validations/query.validation.js";

import {
    getActivities,
} from "../controllers/activity.controller.js";

const router = Router();

router.get(
    "/",
    protect,
    validateQuery(
        paginationQuerySchema
    ),
    getActivities
);

export default router;
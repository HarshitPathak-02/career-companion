import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

import {
    createSkillSchema,
    updateSkillSchema,
} from "../validations/skill.validation.js";

import {
    createSkill,
    deleteSkill,
    getSkills,
    updateSkill,
} from "../controllers/skill.controller.js";

import {
    validateQuery
} from "../middlewares/validate-query.middleware.js";


import {
    paginationQuerySchema
} from "../validations/query.validation.js";

const router = Router();

router.get(
    "/",
    protect,
    validateQuery(
        paginationQuerySchema
    ),
    getSkills
);

router.post(
    "/",
    protect,
    validate(createSkillSchema),
    createSkill
);

router.patch(
    "/:id",
    protect,
    validateObjectId(),
    validate(updateSkillSchema),
    updateSkill
);

router.delete(
    "/:id",
    protect,
    validateObjectId(),
    deleteSkill
);

export default router;
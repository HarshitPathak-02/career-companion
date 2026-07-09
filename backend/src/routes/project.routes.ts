import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
} from "../controllers/project.controller.js";

import {
    createProjectSchema,
    updateProjectSchema,
} from "../validations/project.validation.js";

import {
    paginationQuerySchema,
} from "../validations/query.validation.js";

const router = Router();

router.post(
    "/",
    protect,
    validate(createProjectSchema),
    createProject
);

router.get(
    "/",
    protect,
    validateQuery(paginationQuerySchema),
    getProjects
);

router.patch(
    "/:id",
    protect,
    validate(updateProjectSchema),
    updateProject
);

router.delete(
    "/:id",
    protect,
    deleteProject
);

export default router;
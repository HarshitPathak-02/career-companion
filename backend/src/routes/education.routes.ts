import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation,
} from "../controllers/education.controller.js";

import {
    createEducationSchema,
    updateEducationSchema,
} from "../validations/education.validation.js";

import {
    paginationQuerySchema,
} from "../validations/query.validation.js";


const router = Router();


router.post(
    "/",
    protect,
    validate(createEducationSchema),
    createEducation
);


router.get(
    "/",
    protect,
    validateQuery(paginationQuerySchema),
    getEducation
);


router.patch(
    "/:id",
    protect,
    validate(updateEducationSchema),
    updateEducation
);


router.delete(
    "/:id",
    protect,
    deleteEducation
);


export default router;
import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";

import {
    createCertification,
    getCertifications,
    updateCertification,
    deleteCertification,
} from "../controllers/certification.controller.js";

import {
    createCertificationSchema,
    updateCertificationSchema,
} from "../validations/certification.validation.js";

import {
    paginationQuerySchema,
} from "../validations/query.validation.js";

const router = Router();

router.post(
    "/",
    protect,
    validate(createCertificationSchema),
    createCertification
);

router.get(
    "/",
    protect,
    validateQuery(paginationQuerySchema),
    getCertifications
);

router.patch(
    "/:id",
    protect,
    validate(updateCertificationSchema),
    updateCertification
);

router.delete(
    "/:id",
    protect,
    deleteCertification
);

export default router;
import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    analyzeResume,
    getATSReports,
    getATSReportById,
    deleteATSReport,
} from "../controllers/ats.controller.js";

import {
    analyzeATSRequestSchema,
} from "../validations/ats.validation.js";


const router = Router();



router.post(
    "/analyze",
    protect,
    validate(analyzeATSRequestSchema),
    analyzeResume
);



router.get(
    "/",
    protect,
    getATSReports
);



router.get(
    "/:id",
    protect,
    getATSReportById
);



router.delete(
    "/:id",
    protect,
    deleteATSReport
);



export default router;
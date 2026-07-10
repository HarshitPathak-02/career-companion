import { Router } from "express";

import { SkillGapController } from "../controllers/skillGap.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    analyzeSkillGapRequestSchema,
} from "../validations/skillGap.validation.js";

const router = Router();

router.use(protect);

router.post(
    "/analyze",
    validate(analyzeSkillGapRequestSchema),
    SkillGapController.analyzeSkillGap,
);

router.get(
    "/",
    SkillGapController.getReports,
);

router.get(
    "/:reportId",
    SkillGapController.getReportById,
);

router.delete(
    "/:reportId",
    SkillGapController.deleteReport,
);

export default router;
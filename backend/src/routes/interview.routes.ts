import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";


import {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    updateInterviewStatus,
    deleteInterview,
} from "../controllers/interview.controller.js";


import {
    createInterviewSchema,
    updateInterviewSchema,
    updateInterviewStatusSchema,
} from "../validations/interview.validation.js";



const router = Router();



router.post(
    "/",
    protect,
    validate(createInterviewSchema),
    createInterview
);



router.get(
    "/",
    protect,
    getInterviews
);



router.get(
    "/:id",
    protect,
    getInterviewById
);



router.patch(
    "/:id",
    protect,
    validate(updateInterviewSchema),
    updateInterview
);



router.patch(
    "/:id/status",
    protect,
    validate(updateInterviewStatusSchema),
    updateInterviewStatus
);



router.delete(
    "/:id",
    protect,
    deleteInterview
);



export default router;
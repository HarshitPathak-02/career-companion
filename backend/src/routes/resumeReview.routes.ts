import { Router } from "express";

import {
    ResumeReviewController,
} from "../controllers/resumeReview.controller.js";

import {
    asyncHandler,
} from "../utils/asyncHandler.js";

import {
    protect,
} from "../middlewares/auth.middleware.js";


const router = Router();


router.use(
    protect,
);


router.post(

    "/analyze",

    asyncHandler(

        ResumeReviewController.analyze,

    ),

);


router.get(

    "/",

    asyncHandler(

        ResumeReviewController.getReports,

    ),

);


router.get(

    "/:id",

    asyncHandler(

        ResumeReviewController.getById,

    ),

);


router.delete(

    "/:id",

    asyncHandler(

        ResumeReviewController.delete,

    ),

);


export default router;
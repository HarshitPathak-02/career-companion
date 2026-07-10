import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";

import { InterviewAIController } from "../controllers/interviewAI.controller.js";

import { asyncHandler } from "../utils/asyncHandler.js";


const router = Router();


router.use(
    protect
);



router.post(

    "/generate",

    asyncHandler(

        InterviewAIController.generate

    )

);



router.get(

    "/reports",

    asyncHandler(

        InterviewAIController.getReports

    )

);



router.get(

    "/reports/:id",

    asyncHandler(

        InterviewAIController.getReportById

    )

);

router.delete(

    "/reports/:id",

    asyncHandler(

        InterviewAIController.deleteReport

    )

);



export default router;
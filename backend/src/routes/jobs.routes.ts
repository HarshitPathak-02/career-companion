import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";


import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    updateJobStatus,
    deleteJob,
} from "../controllers/jobs.controller.js";


import {
    createJobSchema,
    updateJobSchema,
    updateJobStatusSchema,
} from "../validations/jobs.validation.js";



const router = Router();



router.post(
    "/",
    protect,
    validate(createJobSchema),
    createJob
);



router.get(
    "/",
    protect,
    getJobs
);



router.get(
    "/:id",
    protect,
    getJobById
);



router.patch(
    "/:id",
    protect,
    validate(updateJobSchema),
    updateJob
);



router.patch(
    "/:id/status",
    protect,
    validate(updateJobStatusSchema),
    updateJobStatus
);



router.delete(
    "/:id",
    protect,
    deleteJob
);



export default router;
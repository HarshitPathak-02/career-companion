import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    setDefaultResume,
} from "../controllers/resume.controller.js";

import {
    createResumeSchema,
    updateResumeSchema,
} from "../validations/resume.validation.js";


const router = Router();


// Create Resume
router.post(
    "/",
    protect,
    validate(createResumeSchema),
    createResume
);


// Get All Resumes
router.get(
    "/",
    protect,
    getResumes
);


// Get Single Resume
router.get(
    "/:id",
    protect,
    getResumeById
);


// Update Resume
router.patch(
    "/:id",
    protect,
    validate(updateResumeSchema),
    updateResume
);


// Delete Resume
router.delete(
    "/:id",
    protect,
    deleteResume
);


// Set Default Resume
router.patch(
    "/:id/default",
    protect,
    setDefaultResume
);


export default router;
import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";

import {
    uploadProfileImage as uploadProfileImageMiddleware,
    uploadResume as uploadResumeMiddleware,
    uploadProjectImage as uploadProjectImageMiddleware,
    uploadCertificate as uploadCertificateMiddleware,
} from "../middlewares/upload.middleware.js";

import {
    uploadProfileImage,
    uploadResume,
    uploadProjectImage,
    uploadCertificate,
} from "../controllers/upload.controller.js";

const router = Router();

router.post(
    "/profile-image",
    protect,
    uploadProfileImageMiddleware,
    uploadProfileImage
);

router.post(
    "/resume",
    protect,
    uploadResumeMiddleware,
    uploadResume
);

router.post(
    "/project-image",
    protect,
    uploadProjectImageMiddleware,
    uploadProjectImage
);

router.post(
    "/certificate",
    protect,
    uploadCertificateMiddleware,
    uploadCertificate
);

export default router;
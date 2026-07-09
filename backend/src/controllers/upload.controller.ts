import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { UploadService } from "../services/upload.service.js";
import { AppError } from "../utils/app-error.js";

export const uploadProfileImage = asyncHandler(
    async (req: Request, res: Response) => {

        if (!req.file) {
            throw new AppError(
                "File is required",
                400
            );
        }

        const result =
            await UploadService.uploadFile(
                req.file,
                req.user.id,
                "profile"
            );

        return res.status(200).json(
            successResponse(
                "Profile image uploaded successfully",
                result
            )
        );
    }
);

export const uploadResume = asyncHandler(
    async (req: Request, res: Response) => {

        if (!req.file) {
            throw new AppError(
                "File is required",
                400
            );
        }

        const result =
            await UploadService.uploadFile(
                req.file,
                req.user.id,
                "resume",
                "raw"
            );

        return res.status(200).json(
            successResponse(
                "Resume uploaded successfully",
                result
            )
        );
    }
);

export const uploadProjectImage = asyncHandler(
    async (req: Request, res: Response) => {

        if (!req.file) {
            throw new AppError(
                "File is required",
                400
            );
        }

        const result =
            await UploadService.uploadFile(
                req.file,
                req.user.id,
                "project"
            );

        return res.status(200).json(
            successResponse(
                "Project image uploaded successfully",
                result
            )
        );
    }
);

export const uploadCertificate = asyncHandler(
    async (req: Request, res: Response) => {

        if (!req.file) {
            throw new AppError(
                "File is required",
                400
            );
        }

        const result =
            await UploadService.uploadFile(
                req.file,
                req.user.id,
                "certificate",
                req.file.mimetype === "application/pdf"
                    ? "raw"
                    : "image"
            );

        return res.status(200).json(
            successResponse(
                "Certificate uploaded successfully",
                result
            )
        );
    }
);
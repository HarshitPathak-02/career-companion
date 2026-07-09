import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/app-error.js";

import { ResumeService } from "../services/resume.service.js";

export const createResume = asyncHandler(
    async (req: Request, res: Response) => {

        const resume =
            await ResumeService.createResume(
                req.user!.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Resume created successfully",
                resume
            )
        );

    }
);

export const getResumes = asyncHandler(
    async (req: Request, res: Response) => {

        const options = {

            ...(typeof req.query.page === "string" && {
                page: Number(req.query.page),
            }),

            ...(typeof req.query.limit === "string" && {
                limit: Number(req.query.limit),
            }),

            ...(typeof req.query.search === "string" && {
                search: req.query.search,
            }),

            ...(typeof req.query.sort === "string" && {
                sort: req.query.sort,
            }),

        };

        const result =
            await ResumeService.getResumes(
                req.user.id,
                options
            );

        return res.status(200).json(
            successResponse(
                "Resumes fetched successfully",
                result
            )
        );

    }
);

export const getResumeById = asyncHandler(
    async (req: Request, res: Response) => {

        const { id: resumeId } = req.params;

        if (
            typeof resumeId !== "string"
        ) {
            throw new AppError(
                "Invalid Resume ID",
                400
            );
        }

        const resume =
            await ResumeService.getResumeById(
                req.user.id,
                resumeId
            );

        return res.status(200).json(
            successResponse(
                "Resume fetched successfully",
                resume
            )
        );

    }
);

export const updateResume = asyncHandler(
    async (req: Request, res: Response) => {

        const resumeId = req.params.id;

        if (
            typeof resumeId !== "string"
        ) {
            throw new AppError(
                "Invalid Resume ID",
                400
            );
        }

        const resume =
            await ResumeService.updateResume(
                req.user!.id,
                resumeId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Resume updated successfully",
                resume
            )
        );

    }
);

export const deleteResume = asyncHandler(
    async (req: Request, res: Response) => {

        const resumeId = req.params.id;

        if (
            typeof resumeId !== "string"
        ) {
            throw new AppError(
                "Invalid Resume ID",
                400
            );
        }

        await ResumeService.deleteResume(
            req.user!.id,
            resumeId
        );

        return res.status(200).json(
            successResponse(
                "Resume deleted successfully"
            )
        );

    }
);

export const setDefaultResume = asyncHandler(
    async (req: Request, res: Response) => {

        const resumeId = req.params.id;

        if (
            typeof resumeId !== "string"
        ) {
            throw new AppError(
                "Invalid Resume ID",
                400
            );
        }

        const resume =
            await ResumeService.setDefaultResume(
                req.user!.id,
                resumeId
            );

        return res.status(200).json(
            successResponse(
                "Default resume updated successfully",
                resume
            )
        );

    }
);
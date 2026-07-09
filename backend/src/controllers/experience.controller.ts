import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { ExperienceService } from "../services/experience.service.js";
import { AppError } from "../utils/app-error.js";

export const createExperience = asyncHandler(
    async (req: Request, res: Response) => {

        const experience =
            await ExperienceService.createExperience(
                req.user.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Experience created successfully",
                experience
            )
        );
    }
);

export const getExperience = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await ExperienceService.getExperience(
                req.user.id,
                {

                    ...(req.query.page && {
                        page: Number(req.query.page),
                    }),

                    ...(req.query.limit && {
                        limit: Number(req.query.limit),
                    }),

                    ...(typeof req.query.search === "string" && {
                        search: req.query.search,
                    }),

                    ...(typeof req.query.sort === "string" && {
                        sort: req.query.sort,
                    }),

                }
            );

        return res.status(200).json(
            successResponse(
                "Experience fetched successfully",
                result
            )
        );
    }
);

export const updateExperience = asyncHandler(
    async (req: Request, res: Response) => {

        const experienceId = req.params.id;

        if (typeof experienceId !== "string") {
            throw new AppError(
                "Invalid Experience ID",
                400
            );
        }

        const experience =
            await ExperienceService.updateExperience(
                req.user.id,
                experienceId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Experience updated successfully",
                experience
            )
        );
    }
);

export const deleteExperience = asyncHandler(
    async (req: Request, res: Response) => {

        const experienceId = req.params.id;

        if (typeof experienceId !== "string") {
            throw new AppError(
                "Invalid Experience ID",
                400
            );
        }

        await ExperienceService.deleteExperience(
            req.user.id,
            experienceId
        );

        return res.status(200).json(
            successResponse(
                "Experience deleted successfully"
            )
        );
    }
);
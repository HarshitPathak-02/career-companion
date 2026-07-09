import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AchievementService } from "../services/achievement.service.js";
import { AppError } from "../utils/app-error.js";

export const createAchievement = asyncHandler(
    async (req: Request, res: Response) => {

        const achievement =
            await AchievementService.createAchievement(
                req.user.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Achievement created successfully",
                achievement
            )
        );
    }
);

export const getAchievements = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await AchievementService.getAchievements(
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
                "Achievements fetched successfully",
                result
            )
        );
    }
);

export const updateAchievement = asyncHandler(
    async (req: Request, res: Response) => {

        const achievementId = req.params.id;

        if (typeof achievementId !== "string") {
            throw new AppError(
                "Invalid Achievement ID",
                400
            );
        }

        const achievement =
            await AchievementService.updateAchievement(
                req.user.id,
                achievementId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Achievement updated successfully",
                achievement
            )
        );
    }
);

export const deleteAchievement = asyncHandler(
    async (req: Request, res: Response) => {

        const achievementId = req.params.id;

        if (typeof achievementId !== "string") {
            throw new AppError(
                "Invalid Achievement ID",
                400
            );
        }

        await AchievementService.deleteAchievement(
            req.user.id,
            achievementId
        );

        return res.status(200).json(
            successResponse(
                "Achievement deleted successfully"
            )
        );
    }
);
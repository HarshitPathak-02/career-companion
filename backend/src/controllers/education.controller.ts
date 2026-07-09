import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { EducationService } from "../services/education.service.js";
import { AppError } from "../utils/app-error.js";


export const createEducation = asyncHandler(
    async (req: Request, res: Response) => {

        const education =
            await EducationService.createEducation(
                req.user.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Education created successfully",
                education
            )
        );
    }
);


export const getEducation = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await EducationService.getEducation(
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
                "Education fetched successfully",
                result
            )
        );
    }
);


export const updateEducation = asyncHandler(
    async (req: Request, res: Response) => {

        const educationId = req.params.id;

        if (typeof educationId !== "string") {
            throw new AppError(
                "Invalid Education ID",
                400
            );
        }

        const education =
            await EducationService.updateEducation(
                req.user.id,
                educationId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Education updated successfully",
                education
            )
        );
    }
);


export const deleteEducation = asyncHandler(
    async (req: Request, res: Response) => {

        const educationId = req.params.id;

        if (typeof educationId !== "string") {
            throw new AppError(
                "Invalid Education ID",
                400
            );
        }

        await EducationService.deleteEducation(
            req.user.id,
            educationId
        );

        return res.status(200).json(
            successResponse(
                "Education deleted successfully"
            )
        );
    }
);
import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { ProjectService } from "../services/project.service.js";
import { AppError } from "../utils/app-error.js";

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {

        const project =
            await ProjectService.createProject(
                req.user.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Project created successfully",
                project
            )
        );
    }
);

export const getProjects = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await ProjectService.getProjects(
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
                "Projects fetched successfully",
                result
            )
        );
    }
);

export const updateProject = asyncHandler(
    async (req: Request, res: Response) => {

        const projectId = req.params.id;

        if (typeof projectId !== "string") {
            throw new AppError(
                "Invalid Project ID",
                400
            );
        }

        const project =
            await ProjectService.updateProject(
                req.user.id,
                projectId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Project updated successfully",
                project
            )
        );
    }
);

export const deleteProject = asyncHandler(
    async (req: Request, res: Response) => {

        const projectId = req.params.id;

        if (typeof projectId !== "string") {
            throw new AppError(
                "Invalid Project ID",
                400
            );
        }

        await ProjectService.deleteProject(
            req.user.id,
            projectId
        );

        return res.status(200).json(
            successResponse(
                "Project deleted successfully"
            )
        );
    }
);
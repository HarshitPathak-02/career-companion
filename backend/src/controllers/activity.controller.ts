import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { ActivityService } from "../services/activity.service.js";

export const getActivities = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await ActivityService.getActivities(
                req.user.id,
                {

                    ...(req.query.page && {
                        page: Number(req.query.page),
                    }),

                    ...(req.query.limit && {
                        limit: Number(req.query.limit),
                    }),

                    ...(typeof req.query.search ===
                        "string" && {
                        search: req.query.search,
                    }),

                    ...(typeof req.query.sort ===
                        "string" && {
                        sort: req.query.sort,
                    }),

                }
            );

        return res.status(200).json(
            successResponse(
                "Activities fetched successfully",
                result
            )
        );

    }
);  
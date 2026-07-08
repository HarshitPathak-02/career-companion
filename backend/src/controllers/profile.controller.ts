import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { ProfileService } from "../services/profile.service.js";

export const getMyProfile = asyncHandler(
    async (req: Request, res: Response) => {

        const profile =
            await ProfileService.getMyProfile(
                req.user.id
            );

        return res.status(200).json(
            successResponse(
                "Profile fetched successfully",
                profile
            )
        );
    }
);

export const updateProfile = asyncHandler(
    async (req: Request, res: Response) => {

        const profile =
            await ProfileService.updateProfile(
                req.user.id,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Profile updated successfully",
                profile
            )
        );
    }
);
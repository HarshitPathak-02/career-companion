import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import { DashboardService } from "../services/dashboard.service.js";



export const getDashboard =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const dashboard =
        await DashboardService.getDashboard(

            req.user.id

        );



    return res.status(200).json(

        successResponse(
            "Dashboard fetched successfully",
            dashboard
        )

    );


});
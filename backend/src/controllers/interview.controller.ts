import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/app-error.js";

import { InterviewService } from "../services/interview.service.js";



export const createInterview =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const interview =
        await InterviewService.createInterview(

            req.user.id,

            req.body

        );



    return res.status(201).json(

        successResponse(
            "Interview created successfully",
            interview
        )

    );


});





export const getInterviews =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const interviews =
        await InterviewService.getInterviews(

            req.user.id

        );



    return res.status(200).json(

        successResponse(
            "Interviews fetched successfully",
            interviews
        )

    );

});





export const getInterviewById =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const { id: interviewId } =
        req.params;



    if(typeof interviewId !== "string"){

        throw new AppError(
            "Invalid Interview ID",
            400
        );

    }



    const interview =
        await InterviewService.getInterviewById(

            req.user.id,

            interviewId

        );



    return res.status(200).json(

        successResponse(
            "Interview fetched successfully",
            interview
        )

    );


});





export const updateInterview =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const { id: interviewId } =
        req.params;



    if(typeof interviewId !== "string"){

        throw new AppError(
            "Invalid Interview ID",
            400
        );

    }



    const interview =
        await InterviewService.updateInterview(

            req.user.id,

            interviewId,

            req.body

        );



    return res.status(200).json(

        successResponse(
            "Interview updated successfully",
            interview
        )

    );


});





export const updateInterviewStatus =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const { id: interviewId } =
        req.params;



    if(typeof interviewId !== "string"){

        throw new AppError(
            "Invalid Interview ID",
            400
        );

    }



    const interview =
        await InterviewService.updateStatus(

            req.user.id,

            interviewId,

            req.body

        );



    return res.status(200).json(

        successResponse(
            "Interview status updated successfully",
            interview
        )

    );


});





export const deleteInterview =
asyncHandler(
async (
    req: Request,
    res: Response
) => {


    const { id: interviewId } =
        req.params;



    if(typeof interviewId !== "string"){

        throw new AppError(
            "Invalid Interview ID",
            400
        );

    }



    await InterviewService.deleteInterview(

        req.user.id,

        interviewId

    );



    return res.status(200).json(

        successResponse(
            "Interview deleted successfully"
        )

    );


});
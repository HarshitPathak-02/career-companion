import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import { InterviewAIService } from "../services/interviewAI.service.js";

import { AppError } from "../utils/app-error.js";



export class InterviewAIController {



    static generate =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {



                const {

                    resumeId

                } = req.body;



                if (typeof resumeId !== "string") {


                    throw new AppError(

                        "Resume ID is required",

                        400

                    );

                }



                const result =

                    await InterviewAIService.generateInterview(

                        req.user.id,

                        resumeId,

                    );



                return res.status(200).json(

                    successResponse(

                        "Interview preparation generated successfully",

                        result,

                    )

                );


            });
    static getReports =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {


                const reports =

                    await InterviewAIService.getReports(

                        req.user.id

                    );



                return res.status(200).json(

                    successResponse(

                        "Interview preparation reports fetched successfully",

                        reports

                    )

                );


            });

    static getReportById =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {


                const {

                    id: reportId

                } = req.params;



                if (typeof reportId !== "string") {


                    throw new AppError(

                        "Invalid report id",

                        400

                    );


                }



                const report =

                    await InterviewAIService.getReportById(

                        req.user.id,

                        reportId

                    );



                return res.status(200).json(

                    successResponse(

                        "Interview preparation report fetched successfully",

                        report

                    )

                );


            });

    static deleteReport =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {


                const {

                    id: reportId

                } = req.params;



                if (typeof reportId !== "string") {


                    throw new AppError(

                        "Invalid report id",

                        400

                    );

                }



                await InterviewAIService.deleteReport(

                    req.user.id,

                    reportId

                );



                return res.status(200).json(

                    successResponse(

                        "Interview preparation report deleted successfully"

                    )

                );


            });



}
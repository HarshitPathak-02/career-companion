import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/app-error.js";

import { ATSService } from "../services/ats.service.js";


export const analyzeResume = asyncHandler(
    async (req: Request, res: Response) => {

        const report =
            await ATSService.analyzeResume(
                req.user.id,
                req.body
            );


        return res.status(201).json(

            successResponse(
                "ATS analysis completed successfully",
                report
            )

        );

    }
);



export const getATSReports = asyncHandler(
    async (req: Request, res: Response) => {


        const options = {

            ...(typeof req.query.page === "string" && {

                page:
                    Number(req.query.page),

            }),


            ...(typeof req.query.limit === "string" && {

                limit:
                    Number(req.query.limit),

            }),


            ...(typeof req.query.search === "string" && {

                search:
                    req.query.search,

            }),


            ...(typeof req.query.sort === "string" && {

                sort:
                    req.query.sort,

            }),

        };



        const reports =
            await ATSService.getReports(

                req.user.id,

                options

            );



        return res.status(200).json(

            successResponse(
                "ATS reports fetched successfully",
                reports
            )

        );


    }
);




export const getATSReportById = asyncHandler(
    async (req: Request, res: Response) => {


        const { id: reportId } =
            req.params;



        if (
            typeof reportId !== "string"
        ) {

            throw new AppError(
                "Invalid ATS report ID",
                400
            );

        }



        const report =
            await ATSService.getReportById(

                req.user.id,

                reportId

            );



        return res.status(200).json(

            successResponse(
                "ATS report fetched successfully",
                report
            )

        );

    }
);





export const deleteATSReport = asyncHandler(
    async (req: Request, res: Response) => {


        const { id: reportId } =
            req.params;



        if (
            typeof reportId !== "string"
        ) {

            throw new AppError(
                "Invalid ATS report ID",
                400
            );

        }



        await ATSService.deleteReport(

            req.user.id,

            reportId

        );



        return res.status(200).json(

            successResponse(
                "ATS report deleted successfully"
            )

        );


    }
);
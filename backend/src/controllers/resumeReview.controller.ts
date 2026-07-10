import type { Request, Response } from "express";

import {
    ResumeReviewService,
} from "../services/resumeReview.service.js";

import {
    analyzeResumeReviewRequestSchema,
} from "../validations/resumeReview.validation.js";

import { AppError } from "../utils/app-error.js";


export class ResumeReviewController {


    static async analyze(

        req: Request,

        res: Response,

    ) {

        const userId =

            req.user?.id;


        if (!userId) {

            throw new AppError(

                "Unauthorized",

                401,

            );

        }


        const data =

            analyzeResumeReviewRequestSchema.parse(

                req.body,

            );


        const review =

            await ResumeReviewService.analyzeResume(

                userId,

                data,

            );


        res.status(201).json({

            success: true,

            message:
                "Resume review completed successfully",

            data: review,

        });

    }



    static async getReports(

        req: Request,

        res: Response,

    ) {

        const userId =

            req.user?.id;


        if (!userId) {

            throw new AppError(

                "Unauthorized",

                401,

            );

        }

        const options = {

            ...(req.query.page && {

                page:
                    Number(req.query.page),

            }),

            ...(req.query.limit && {

                limit:
                    Number(req.query.limit),

            }),

            ...(req.query.search && {

                search:
                    req.query.search as string,

            }),

            ...(req.query.sort && {

                sort:
                    req.query.sort as string,

            }),

        };


        const reports =

            await ResumeReviewService.getReports(

                userId,

                options,

            );




        res.status(200).json({

            success: true,

            data: reports,

        });

    }



    static async getById(

        req: Request,

        res: Response,

    ) {

        const userId =

            req.user?.id;


        if (!userId) {

            throw new AppError(

                "Unauthorized",

                401,

            );

        }


        const report =

            await ResumeReviewService.getReportById(

                userId,

                String(req.params.id),


            );


        res.status(200).json({

            success: true,

            data: report,

        });

    }



    static async delete(

        req: Request,

        res: Response,

    ) {

        const userId =

            req.user?.id;


        if (!userId) {

            throw new AppError(

                "Unauthorized",

                401,

            );

        }


        await ResumeReviewService.deleteReport(

            userId,

            String(req.params.id),

        );


        res.status(200).json({

            success: true,

            message:
                "Resume review deleted successfully",

        });

    }

}
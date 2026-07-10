import {
    Request,
    Response,
} from "express";


import {
    asyncHandler,
} from "../utils/asyncHandler.js";


import {
    successResponse,
} from "../utils/apiResponse.js";


import {
    AppError,
} from "../utils/app-error.js";


import {
    CoverLetterService,
} from "../services/coverLetter.service.js";





export class CoverLetterController {



    static generate =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {


                const {

                    resumeId,

                    jobDescription,

                } = req.body;



                const report =

                    await CoverLetterService.generate(

                        req.user.id,

                        resumeId,

                        jobDescription,

                    );



                return res.status(201).json(

                    successResponse(

                        "Cover letter generated successfully",

                        report

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

                    await CoverLetterService.getReports(

                        req.user.id

                    );



                return res.status(200).json(

                    successResponse(

                        "Cover letter reports fetched successfully",

                        reports

                    )

                );


            });
    static getById =

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

                    await CoverLetterService.getReportById(

                        req.user.id,

                        reportId

                    );



                return res.status(200).json(

                    successResponse(

                        "Cover letter report fetched successfully",

                        report

                    )

                );


            });

    static delete =

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



                await CoverLetterService.deleteReport(

                    req.user.id,

                    reportId

                );



                return res.status(200).json(

                    successResponse(

                        "Cover letter report deleted successfully"

                    )

                );


            });

}











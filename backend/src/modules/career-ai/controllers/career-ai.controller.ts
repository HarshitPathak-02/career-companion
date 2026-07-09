import type {
    Request,
    Response,
} from "express";


import {
    asyncHandler,
} from "../../../utils/asyncHandler.js";


import {
    successResponse,
} from "../../../utils/apiResponse.js";


import {
    CareerAIService,
} from "../services/career-ai.service.js";


import {
    resumeReviewSchema,
} from "../validations/career-ai.validation.js";


import {
    AppError,
} from "../../../utils/app-error.js";



export const reviewResume =
asyncHandler(

async(

    req: Request,

    res: Response

)=>{


    const validation =
        resumeReviewSchema.safeParse(
            req.body
        );



    if(!validation.success){


        throw new AppError(

            validation.error
                .issues[0]
                ?.message
                ||
                "Invalid request",

            400

        );

    }



    const result =
        await CareerAIService.reviewResume(

            req.user.id,

            validation.data

        );



    return res.status(200).json(

        successResponse(

            "Resume reviewed successfully",

            result

        )

    );


}

);
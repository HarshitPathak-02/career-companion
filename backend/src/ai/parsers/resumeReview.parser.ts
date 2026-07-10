import {
    ResumeReviewAIResponseSchema,
} from "../../validations/resumeReview.validation.js";

import type {
    ResumeReviewAIResponse,
} from "../../validations/resumeReview.validation.js";
import { AIParser } from "../index.js";


export class ResumeReviewParser
    implements AIParser<ResumeReviewAIResponse> {


    parse(
        response: string,
    ): ResumeReviewAIResponse {


        const cleanedResponse =

            response
                .replace(
                    /```json/g,
                    "",
                )
                .replace(
                    /```/g,
                    "",
                )
                .trim();



        const json =

            JSON.parse(
                cleanedResponse,
            );


        console.log(
            "AI RESPONSE JSON:",
            cleanedResponse
        );

        return ResumeReviewAIResponseSchema.parse(
            json,
        );

    }

}
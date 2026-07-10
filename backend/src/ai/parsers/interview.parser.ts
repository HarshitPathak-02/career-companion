import type {
    AIParser,
} from "./index.js";


import {
    interviewAIResponseSchema,
} from "../../validations/interviewAI.validation.js";


import type {
    InterviewAIResponse,
} from "../../validations/interviewAI.validation.js";



export class InterviewParser

implements AIParser<InterviewAIResponse> {


    parse(

        response: string

    ): InterviewAIResponse {


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
                cleanedResponse
            );



        return interviewAIResponseSchema.parse(
            json
        );

    }

}
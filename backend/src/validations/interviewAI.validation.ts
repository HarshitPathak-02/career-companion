import { z } from "zod";


export const interviewQuestionSchema = z.object({

    question:
        z.string(),

    difficulty:
        z.enum([
            "Easy",
            "Medium",
            "Hard",
        ]),

    expectedAnswerPoints:

        z.array(
            z.string()
        ),

});



export const interviewAIResponseSchema = z.object({

    technicalQuestions:

        z.array(
            interviewQuestionSchema
        ),


    projectQuestions:

        z.array(
            interviewQuestionSchema
        ),


    behavioralQuestions:

        z.array(
            interviewQuestionSchema
        ),


    interviewTips:

        z.array(
            z.string()
        ),

});



export type InterviewAIResponse =

    z.infer<
        typeof interviewAIResponseSchema
    >;
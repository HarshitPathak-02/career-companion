import { z } from "zod";


const objectIdSchema =
    z
        .string()
        .trim()
        .regex(
            /^[a-fA-F0-9]{24}$/,
            "Invalid ObjectId"
        );



export const analyzeATSRequestSchema =
    z.object({

        resumeId:
            objectIdSchema,


        jobDescription:
            z
                .string()
                .trim()
                .min(
                    50,
                    "Job description is too short"
                )
                .max(10000),

    });



export type AnalyzeATSRequestInput =
    z.infer<
        typeof analyzeATSRequestSchema
    >;  
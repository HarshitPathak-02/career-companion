import { z } from "zod";


const objectIdSchema =
    z
        .string()
        .trim()
        .length(24, "Invalid ID");



export const resumeReviewSchema =
    z.object({

        resumeId:
            objectIdSchema,


        targetRole:
            z
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional(),


        jobDescription:
            z
            .string()
            .trim()
            .min(10)
            .max(10000)
            .optional(),

    });
import { z } from "zod";

const objectIdSchema = z
    .string()
    .trim()
    .regex(
        /^[a-fA-F0-9]{24}$/,
        "Invalid ObjectId",
    );

export const analyzeSkillGapRequestSchema =
    z.object({

        resumeId: objectIdSchema,

        jobDescription: z
            .string()
            .trim()
            .min(
                50,
                "Job description is too short",
            )
            .max(10000),

    });

export type AnalyzeSkillGapRequestInput =
    z.infer<
        typeof analyzeSkillGapRequestSchema
    >;

export const skillGapAIResponseSchema =
    z.object({

        matchingSkills: z.array(
            z.string(),
        ),

        missingSkills: z.array(
            z.string(),
        ),

        recommendedSkills: z.array(
            z.string(),
        ),

        learningRoadmap: z.array(
            z.string(),
        ),

        overallReadiness: z
            .number()
            .min(0)
            .max(100),

    });

export type SkillGapAIResponse =
    z.infer<
        typeof skillGapAIResponseSchema
    >;
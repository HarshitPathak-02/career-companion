import { z } from "zod";

const objectIdSchema =
    z
        .string()
        .trim()
        .regex(
            /^[a-fA-F0-9]{24}$/,
            "Invalid ObjectId",
        );

export const analyzeResumeReviewRequestSchema =
    z.object({

        resumeId:
            objectIdSchema,

    });

export type AnalyzeResumeReviewRequestInput =
    z.infer<
        typeof analyzeResumeReviewRequestSchema
    >;

export const ResumeReviewAIResponseSchema =
    z.object({

        overallScore:
            z.number().min(0).max(100),

        summaryScore:
            z.number().min(0).max(100),

        experienceScore:
            z.number().min(0).max(100),

        projectScore:
            z.number().min(0).max(100),

        skillScore:
            z.number().min(0).max(100),

        formattingScore:
            z.number().min(0).max(100),

        grammarScore:
            z.number().min(0).max(100),

        strengths:
            z.array(z.string()),

        weaknesses:
            z.array(z.string()),

        suggestions:
            z.array(z.string()),

    });

export type ResumeReviewAIResponse =
    z.infer<
        typeof ResumeReviewAIResponseSchema
    >;
import { z } from "zod";

export const CoverLetterResponseSchema = z.object({

    opening: z.string(),

    introduction: z.string(),

    experienceConnection: z.string(),

    projectHighlights: z.string(),

    technicalStrengths: z.string(),

    closing: z.string(),

    fullContent: z.string(),

});

export type CoverLetterResponse =
    z.infer<typeof CoverLetterResponseSchema>;
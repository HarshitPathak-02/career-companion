import { z } from "zod";

const experienceSchema = z.object({

    company: z
        .string()
        .trim()
        .min(2)
        .max(100),

    jobTitle: z
        .string()
        .trim()
        .min(2)
        .max(100),

    employmentType: z.enum([
        "Internship",
        "Full-Time",
        "Part-Time",
        "Freelance",
        "Contract",
    ]),

    location: z
        .string()
        .trim()
        .max(100)
        .optional(),

    currentlyWorking: z
        .boolean()
        .default(false),

    startDate: z.coerce.date(),

    endDate: z.coerce.date().optional(),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    technologies: z
        .array(z.string().trim())
        .default([]),
});

export const createExperienceSchema =
    experienceSchema.superRefine((data, ctx) => {

        if (
            !data.currentlyWorking &&
            !data.endDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message:
                    "End date is required if you are not currently working.",
            });
        }

        if (
            data.endDate &&
            data.endDate < data.startDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message:
                    "End date cannot be before start date.",
            });
        }

    });

export const updateExperienceSchema =
    experienceSchema.partial();

export type CreateExperienceInput =
    z.infer<typeof createExperienceSchema>;

export type UpdateExperienceInput =
    z.infer<typeof updateExperienceSchema>;
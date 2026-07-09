import { z } from "zod";

export const createEducationSchema = z.object({
    institution: z
        .string()
        .trim()
        .min(2, "Institution name is required")
        .max(150),

    degree: z
        .string()
        .trim()
        .min(2, "Degree is required")
        .max(100),

    fieldOfStudy: z
        .string()
        .trim()
        .min(2, "Field of study is required")
        .max(100),

    startDate: z.coerce.date(),

    endDate: z.coerce.date().optional(),

    currentlyStudying: z
        .boolean()
        .default(false),

    grade: z
        .string()
        .trim()
        .max(50)
        .optional(),

    description: z
        .string()
        .trim()
        .max(500)
        .optional(),
});

export const updateEducationSchema =
    createEducationSchema.partial();

export type CreateEducationInput =
    z.infer<typeof createEducationSchema>;

export type UpdateEducationInput =
    z.infer<typeof updateEducationSchema>;
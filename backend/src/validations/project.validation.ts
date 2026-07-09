import { z } from "zod";

const projectSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2, "Project title is required")
        .max(100),

    description: z
        .string()
        .trim()
        .min(10, "Description is required")
        .max(2000),

    technologies: z
        .array(z.string().trim())
        .default([]),

    githubUrl: z
        .url("Invalid GitHub URL")
        .optional(),

    liveUrl: z
        .url("Invalid Live URL")
        .optional(),

    imageUrl: z
        .url("Invalid Image URL")
        .optional(),

    startDate: z
        .coerce
        .date()
        .optional(),

    endDate: z
        .coerce
        .date()
        .optional(),

    currentlyWorking: z
        .boolean()
        .default(false),

    featured: z
        .boolean()
        .default(false),
});

export const createProjectSchema =
    projectSchema.superRefine((data, ctx) => {

        if (
            !data.currentlyWorking &&
            data.startDate &&
            !data.endDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message:
                    "End date is required if project is completed.",
            });
        }

        if (
            data.startDate &&
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

export const updateProjectSchema =
    projectSchema.partial();

export type CreateProjectInput =
    z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
    z.infer<typeof updateProjectSchema>;    
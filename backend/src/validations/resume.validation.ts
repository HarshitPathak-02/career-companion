import { z } from "zod";

export const resumeTemplateEnum = z.enum([
    "classic",
    "modern",
    "minimal",
    "professional",
    "developer",
]);

export const resumeVisibilityEnum = z.enum([
    "private",
    "public",
]);

export const resumePageSizeEnum = z.enum([
    "A4",
    "Letter",
]);

export const resumeSectionEnum = z.enum([
    "summary",
    "education",
    "experience",
    "projects",
    "skills",
    "certifications",
    "achievements",
    "languages",
]);

const objectIdSchema = z
    .string()
    .trim()
    .regex(
        /^[a-fA-F0-9]{24}$/,
        "Invalid ObjectId"
    );

const designSchema = z.object({

    template: resumeTemplateEnum,

    theme: z
        .string()
        .trim()
        .min(1)
        .max(50),

    primaryColor: z
        .string()
        .regex(
            /^#([0-9A-Fa-f]{6})$/,
            "Invalid HEX color"
        ),

    fontFamily: z
        .string()
        .trim()
        .min(1)
        .max(50),

    fontSize: z
        .number()
        .min(10)
        .max(18),

    lineSpacing: z
        .number()
        .min(1)
        .max(2.5),

    margin: z
        .number()
        .min(10)
        .max(50),

    pageSize: resumePageSizeEnum,

});

const sectionsSchema = z.object({

    summary: z.boolean(),

    education: z.boolean(),

    experience: z.boolean(),

    projects: z.boolean(),

    skills: z.boolean(),

    certifications: z.boolean(),

    achievements: z.boolean(),

    languages: z.boolean(),

});

export const createResumeSchema = z
    .object({

        title: z
            .string()
            .trim()
            .min(2)
            .max(100),

        summary: z
            .string()
            .trim()
            .max(1000)
            .optional(),

        design: designSchema,

        sections: sectionsSchema,

        sectionOrder: z
            .array(resumeSectionEnum)
            .min(
                1,
                "At least one section must be present."
            ),

        educationIds:
            z.array(objectIdSchema),

        experienceIds:
            z.array(objectIdSchema),

        projectIds:
            z.array(objectIdSchema),

        certificationIds:
            z.array(objectIdSchema),

        achievementIds:
            z.array(objectIdSchema),

        skillIds:
            z.array(objectIdSchema),

        visibility:
            resumeVisibilityEnum
                .default("private"),

        isDefault:
            z.boolean()
                .default(false),

    })
    .superRefine((data, ctx) => {

        for (const section of data.sectionOrder) {

            if (!data.sections[section]) {

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["sectionOrder"],
                    message: `${section} is disabled but exists in sectionOrder.`,
                });

            }

        }

    });

export const updateResumeSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    summary: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    design: designSchema
        .partial()
        .optional(),

    sections: sectionsSchema
        .partial()
        .optional(),

    sectionOrder: z
        .array(resumeSectionEnum)
        .min(1)
        .optional(),

    educationIds:
        z.array(objectIdSchema)
            .optional(),

    experienceIds:
        z.array(objectIdSchema)
            .optional(),

    projectIds:
        z.array(objectIdSchema)
            .optional(),

    certificationIds:
        z.array(objectIdSchema)
            .optional(),

    achievementIds:
        z.array(objectIdSchema)
            .optional(),

    skillIds:
        z.array(objectIdSchema)
            .optional(),

    visibility:
        resumeVisibilityEnum
            .optional(),

    isDefault:
        z.boolean()
            .optional(),

});

export type CreateResumeInput =
    z.infer<typeof createResumeSchema>;

export type UpdateResumeInput =
    z.infer<typeof updateResumeSchema>;
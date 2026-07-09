import { z } from "zod";

const achievementSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2)
        .max(150),

    type: z.enum([
        "Hackathon",
        "Competition",
        "Award",
        "Publication",
        "Scholarship",
        "Volunteer",
        "Speaker",
        "Other",
    ]),

    organization: z
        .string()
        .trim()
        .min(2)
        .max(150),

    date: z.coerce.date(),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    url: z
        .url("Invalid URL")
        .optional(),

});

export const createAchievementSchema =
    achievementSchema;

export const updateAchievementSchema =
    achievementSchema.partial();

export type CreateAchievementInput =
    z.infer<typeof createAchievementSchema>;

export type UpdateAchievementInput =
    z.infer<typeof updateAchievementSchema>;
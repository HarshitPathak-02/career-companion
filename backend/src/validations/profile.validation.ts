import { z } from "zod";

export const updateProfileSchema = z.object({
    headline: z.string().trim().max(100).optional(),

    bio: z.string().trim().max(500).optional(),

    phone: z.string().trim().max(20).optional(),

    dateOfBirth: z.coerce.date().optional(),

    gender: z
        .enum(["male", "female", "other"])
        .optional(),

    location: z.string().trim().max(100).optional(),
});

export type UpdateProfileInput = z.infer<
    typeof updateProfileSchema
>;

export const skillSchema = z.object({
    name: z.string().trim().min(1),

    level: z.enum([
        "Beginner",
        "Intermediate",
        "Advanced",
    ]),

    yearsOfExperience: z
        .number()
        .min(0),
});

export const addSkillSchema = z.object({
  skills: z.array(skillSchema),
});
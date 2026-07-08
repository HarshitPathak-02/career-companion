import { z } from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required")
    .max(60),

  level: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]),

  yearsOfExperience: z
    .number()
    .min(0)
    .max(50),
});

export type CreateSkillInput =
  z.infer<typeof createSkillSchema>;

export const updateSkillSchema =
  createSkillSchema.partial();

export type UpdateSkillInput =
  z.infer<typeof updateSkillSchema>;
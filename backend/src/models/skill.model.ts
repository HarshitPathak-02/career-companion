import { Schema, model } from "mongoose";

import type { ISkill } from "../types/skill.types.js";

const skillSchema = new Schema<ISkill>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60,
        },

        level: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
            ],
            default: "Beginner",
        },

        yearsOfExperience: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

skillSchema.index({
    userId: 1,
    name: 1,
}, {
    unique: true,
});

export const Skill = model<ISkill>(
    "Skill",
    skillSchema
);
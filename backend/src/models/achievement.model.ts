import { Schema, model } from "mongoose";
import type { IAchievement } from "../types/achievement.types.js";

const achievementSchema = new Schema<IAchievement>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        type: {
            type: String,
            enum: [
                "Hackathon",
                "Competition",
                "Award",
                "Publication",
                "Scholarship",
                "Volunteer",
                "Speaker",
                "Other",
            ],
            required: true,
        },

        organization: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        date: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        url: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Achievement = model<IAchievement>(
    "Achievement",
    achievementSchema
);
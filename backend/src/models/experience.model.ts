import { Schema, model } from "mongoose";
import type { IExperience } from "../types/experience.types.js";

const experienceSchema = new Schema<IExperience>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        employmentType: {
            type: String,
            enum: [
                "Internship",
                "Full-Time",
                "Part-Time",
                "Freelance",
                "Contract",
            ],
            required: true,
        },

        location: {
            type: String,
            trim: true,
        },

        currentlyWorking: {
            type: Boolean,
            default: false,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        technologies: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Experience = model<IExperience>(
    "Experience",
    experienceSchema
);
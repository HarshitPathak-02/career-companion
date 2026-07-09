import { Schema, model } from "mongoose";
import type { IEducation } from "../types/education.types.js";

const educationSchema = new Schema<IEducation>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        institution: {
            type: String,
            required: true,
            trim: true,
        },

        degree: {
            type: String,
            required: true,
            trim: true,
        },

        fieldOfStudy: {
            type: String,
            required: true,
            trim: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: Date,

        currentlyStudying: {
            type: Boolean,
            default: false,
        },

        grade: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Education = model<IEducation>(
    "Education",
    educationSchema
);
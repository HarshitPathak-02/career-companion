import { Schema, model } from "mongoose";
import type { IProject } from "../types/project.types.js";

const projectSchema = new Schema<IProject>(
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
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },

        technologies: [
            {
                type: String,
                trim: true,
            },
        ],

        githubUrl: {
            type: String,
            trim: true,
        },

        liveUrl: {
            type: String,
            trim: true,
        },

        imageUrl: {
            type: String,
            trim: true,
        },

        startDate: Date,

        endDate: Date,

        currentlyWorking: {
            type: Boolean,
            default: false,
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Project = model<IProject>(
    "Project",
    projectSchema
);
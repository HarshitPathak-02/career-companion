import { Schema, model } from "mongoose";

import type { ISkillGap } from "../types/skillGap.types.js";

const skillGapSchema = new Schema<ISkillGap>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        resumeId: {
            type: Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
            index: true,
        },

        jobDescription: {
            type: String,
            required: true,
            trim: true,
        },

        matchingSkills: [
            {
                type: String,
                trim: true,
            },
        ],

        missingSkills: [
            {
                type: String,
                trim: true,
            },
        ],

        recommendedSkills: [
            {
                type: String,
                trim: true,
            },
        ],

        learningRoadmap: [
            {
                type: String,
                trim: true,
            },
        ],

        overallReadiness: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

    },
    {
        timestamps: true,
    }
);

export const SkillGap = model<ISkillGap>(
    "SkillGap",
    skillGapSchema,
);
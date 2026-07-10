import {
    Schema,
    model,
} from "mongoose";

import type {
    IResumeReview,
} from "../types/resumeReview.types.js";

const resumeReviewSchema =
    new Schema<IResumeReview>(
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

            overallScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            summaryScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            experienceScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            projectScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            skillScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            formattingScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            grammarScore: {

                type: Number,

                required: true,

                min: 0,

                max: 100,

            },

            strengths: [

                {

                    type: String,

                    trim: true,

                },

            ],

            weaknesses: [

                {

                    type: String,

                    trim: true,

                },

            ],

            suggestions: [

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

export const ResumeReview =
    model<IResumeReview>(

        "ResumeReview",

        resumeReviewSchema,

    );
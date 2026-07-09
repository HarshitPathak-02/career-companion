import { Schema, model } from "mongoose";

import type {
    IATSReport,
} from "../types/ats.types.js";


const atsReportSchema =
    new Schema<IATSReport>(
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
                maxlength: 10000,
            },


            score: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },


            matchedSkills: [
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


            keywordScore: {
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


            formattingScore: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },


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


atsReportSchema.index({
    userId: 1,
    createdAt: -1,
});


export const ATSReport =
    model<IATSReport>(
        "ATSReport",
        atsReportSchema
    );
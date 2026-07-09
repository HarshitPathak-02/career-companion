import { Schema, model } from "mongoose";

import type {
    IJobApplication,
} from "../types/jobs.types.js";


const jobSchema =
    new Schema<IJobApplication>(
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

                maxlength: 100,

            },


            role: {

                type: String,

                required: true,

                trim: true,

                maxlength: 100,

            },


            jobType: {

                type: String,

                enum: [
                    "Full-Time",
                    "Part-Time",
                    "Internship",
                    "Contract",
                    "Freelance",
                ],

                required: true,

            },


            location: {

                type: String,

                trim: true,

                maxlength: 100,

            },


            jobUrl: {

                type: String,

                trim: true,

            },


            description: {

                type: String,

                trim: true,

                maxlength: 10000,

            },


            status: {

                type: String,

                enum: [
                    "Saved",
                    "Applied",
                    "OA",
                    "Interview",
                    "Offer",
                    "Rejected",
                    "Withdrawn",
                ],

                default: "Saved",

            },


            appliedDate: {

                type: Date,

            },


            resumeId: {

                type: Schema.Types.ObjectId,

                ref: "Resume",

            },


            notes: {

                type: String,

                trim: true,

                maxlength: 2000,

            },


        },

        {
            timestamps: true,
        }

    );


jobSchema.index({
    userId: 1,
    status: 1,
});


jobSchema.index({
    userId: 1,
    createdAt: -1,
});


export const JobApplication =
    model<IJobApplication>(
        "JobApplication",
        jobSchema
    );
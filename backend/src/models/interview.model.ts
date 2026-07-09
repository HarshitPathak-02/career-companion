import { Schema, model } from "mongoose";

import type {
    IInterview,
} from "../types/interview.types.js";



const interviewSchema =
    new Schema<IInterview>(
        {


            userId: {

                type: Schema.Types.ObjectId,

                ref: "User",

                required: true,

                index: true,

            },


            jobId: {

                type: Schema.Types.ObjectId,

                ref: "JobApplication",

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


            round: {

                type: String,

                required: true,

                trim: true,

                maxlength: 100,

            },


            type: {

                type: String,

                enum: [

                    "HR",

                    "Technical",

                    "Machine Coding",

                    "System Design",

                    "Managerial",

                    "Behavioral",

                ],

                required: true,

            },


            scheduledAt: {

                type: Date,

                required: true,

            },


            mode: {

                type: String,

                enum: [

                    "Online",

                    "Offline",

                ],

                required: true,

            },


            meetingLink: {

                type: String,

                trim: true,

            },


            location: {

                type: String,

                trim: true,

            },


            notes: {

                type: String,

                trim: true,

                maxlength: 2000,

            },


            feedback: {

                type: String,

                trim: true,

                maxlength: 5000,

            },


            status: {

                type: String,

                enum: [

                    "Scheduled",

                    "Completed",

                    "Passed",

                    "Failed",

                    "Cancelled",

                ],

                default: "Scheduled",

            },


        },

        {
            timestamps:true,
        }

    );



interviewSchema.index({

    userId:1,

    scheduledAt:-1,

});



interviewSchema.index({

    userId:1,

    status:1,

});



export const Interview =
    model<IInterview>(
        "Interview",
        interviewSchema
    );
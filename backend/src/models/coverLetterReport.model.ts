import {
    Schema,
    model,
} from "mongoose";


import type {

    ICoverLetterReport,

} from "../types/coverLetter.types.js";




const coverLetterReportSchema =

    new Schema<ICoverLetterReport>(

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

            },



            jobDescription: {

                type: String,

                required: true,

                trim: true,

            },



            opening: {

                type: String,

                required: true,

            },



            introduction: {

                type: String,

                required: true,

            },

            experienceConnection: {
                type: String,
                required: true,
            },

            projectHighlights: {
                type: String,
                required: true,
            },

            technicalStrengths: {
                type: String,
                required: true,
            },

            closing: {

                type: String,

                required: true,

            },



            fullContent: {

                type: String,

                required: true,

            },


        },

        {

            timestamps: true,

        }

    );



coverLetterReportSchema.index({

    userId: 1,

    createdAt: -1,

});



export const CoverLetterReport =

    model<ICoverLetterReport>(

        "CoverLetterReport",

        coverLetterReportSchema

    );
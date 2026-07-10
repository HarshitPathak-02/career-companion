import {
    Schema,
    model,
} from "mongoose";


import type {
    IInterviewPreparationReport,
} from "../types/interviewPreparation.types.js";



const questionSchema =

new Schema(

{

    question: {

        type: String,

        required: true,

    },


    difficulty: {

        type: String,

        enum: [

            "Easy",
            "Medium",
            "Hard",

        ],

        required: true,

    },


    expectedAnswerPoints: {

        type: [

            String

        ],

        required: true,

    },

},

{
    _id:false,
}

);





const interviewPreparationReportSchema =

new Schema<IInterviewPreparationReport>(

{


    userId: {

        type: Schema.Types.ObjectId,

        ref:"User",

        required:true,

        index:true,

    },



    resumeId: {

        type: Schema.Types.ObjectId,

        ref:"Resume",

        required:true,

    },



    technicalQuestions: {

        type:[
            questionSchema
        ],

        default:[],

    },



    projectQuestions: {

        type:[
            questionSchema
        ],

        default:[],

    },



    behavioralQuestions: {

        type:[
            questionSchema
        ],

        default:[],

    },



    interviewTips: {

        type:[
            String
        ],

        default:[],

    },


},

{

    timestamps:true,

}

);



interviewPreparationReportSchema.index({

    userId:1,

    createdAt:-1,

});



export const InterviewPreparationReport =

model<IInterviewPreparationReport>(

    "InterviewPreparationReport",

    interviewPreparationReportSchema

);
import {
    Types,
    HydratedDocument,
} from "mongoose";


export interface IInterviewQuestion {

    question: string;

    difficulty:
        | "Easy"
        | "Medium"
        | "Hard";

    expectedAnswerPoints: string[];

}



export interface IInterviewPreparationReport {


    userId: Types.ObjectId;


    resumeId: Types.ObjectId;


    technicalQuestions:

        IInterviewQuestion[];



    projectQuestions:

        IInterviewQuestion[];



    behavioralQuestions:

        IInterviewQuestion[];



    interviewTips:

        string[];



    createdAt?: Date;


    updatedAt?: Date;

}



export type InterviewPreparationReportDocument =

    HydratedDocument<
        IInterviewPreparationReport
    >;
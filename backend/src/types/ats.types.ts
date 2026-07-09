import { HydratedDocument, Types } from "mongoose";


export interface IATSReport {

    userId: Types.ObjectId;

    resumeId: Types.ObjectId;

    jobDescription: string;


    score: number;


    matchedSkills: string[];

    missingSkills: string[];


    keywordScore: number;

    experienceScore: number;

    formattingScore: number;


    suggestions: string[];


    createdAt?: Date;

    updatedAt?: Date;

}


export type ATSReportDocument =
    HydratedDocument<IATSReport>;
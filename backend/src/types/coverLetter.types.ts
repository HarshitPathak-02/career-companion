import {
    Types,
    HydratedDocument,
} from "mongoose";

export interface ICoverLetterReport {

    userId: Types.ObjectId;

    resumeId: Types.ObjectId;

    jobDescription: string;

    opening: string;

    introduction: string;

    experienceConnection: string;

    projectHighlights: string;

    technicalStrengths: string;

    closing: string;

    fullContent: string;

    createdAt?: Date;

    updatedAt?: Date;

}

export type CoverLetterReportDocument =
    HydratedDocument<ICoverLetterReport>;
import {
    HydratedDocument,
    Types,
} from "mongoose";

export interface IResumeReview {

    userId: Types.ObjectId;

    resumeId: Types.ObjectId;

    overallScore: number;

    summaryScore: number;

    experienceScore: number;

    projectScore: number;

    skillScore: number;

    formattingScore: number;

    grammarScore: number;

    strengths: string[];

    weaknesses: string[];

    suggestions: string[];

    createdAt?: Date;

    updatedAt?: Date;

}

export type ResumeReviewDocument =
    HydratedDocument<IResumeReview>;
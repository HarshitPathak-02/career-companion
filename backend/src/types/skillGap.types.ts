import { HydratedDocument, Types } from "mongoose";

export interface ISkillGap {

    userId: Types.ObjectId;

    resumeId: Types.ObjectId;

    jobDescription: string;

    matchingSkills: string[];

    missingSkills: string[];

    recommendedSkills: string[];

    learningRoadmap: string[];

    overallReadiness: number;

    createdAt?: Date;

    updatedAt?: Date;

}

export type SkillGapDocument =
    HydratedDocument<ISkillGap>;
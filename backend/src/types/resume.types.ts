import { HydratedDocument, Types } from "mongoose";

export type ResumeTemplate =
    | "classic"
    | "modern"
    | "minimal"
    | "professional"
    | "developer";

export type ResumeVisibility =
    | "private"
    | "public";

export type ResumePageSize =
    | "A4"
    | "Letter";

export type ResumeSection =
    | "summary"
    | "education"
    | "experience"
    | "projects"
    | "skills"
    | "certifications"
    | "achievements"
    | "languages";

export interface IResume {

    userId: Types.ObjectId;

    title: string;

    summary?: string;

    design: {

        template: ResumeTemplate;

        theme: string;

        primaryColor: string;

        fontFamily: string;

        fontSize: number;

        lineSpacing: number;

        margin: number;

        pageSize: ResumePageSize;
    };

    sections: Record<ResumeSection, boolean>;

    sectionOrder: ResumeSection[];

    educationIds: Types.ObjectId[];

    experienceIds: Types.ObjectId[];

    projectIds: Types.ObjectId[];

    certificationIds: Types.ObjectId[];

    achievementIds: Types.ObjectId[];

    skillIds: Types.ObjectId[];

    atsScore?: number;

    pdfUrl?: string;

    thumbnailUrl?: string;

    visibility: ResumeVisibility;

    isDefault: boolean;

    createdAt?: Date;

    updatedAt?: Date;
}

export interface SkillGapRequest {

    resumeId: string;

    targetRole: string;

}

export interface SkillGapResponse {

    overallReadiness: number;

    currentSkills: string[];

    missingSkills: string[];

    recommendedProjects: string[];

    learningRoadmap: string[];

    estimatedTimeline: string;

}

export type ResumeDocument =
    HydratedDocument<IResume>;
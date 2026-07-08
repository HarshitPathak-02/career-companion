import { HydratedDocument, Types } from "mongoose";

export interface ISkill {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    yearsOfExperience: number;
}

export interface IProfile {
    userId: Types.ObjectId;

    headline?: string;

    bio?: string;

    phone?: string;

    dateOfBirth?: Date;

    gender?: "male" | "female" | "other";

    location?: string;

    linkedinUrl: string,


    githubUrl: string,

    portfolioUrl: string,

    resumeUrl: string,

    profileCompletion: number;
}

export type ProfileDocument = HydratedDocument<IProfile>;
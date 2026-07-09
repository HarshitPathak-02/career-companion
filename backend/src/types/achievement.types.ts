import type { Types } from "mongoose";

export interface IAchievement {

    userId: Types.ObjectId;

    title: string;

    type:
        | "Hackathon"
        | "Competition"
        | "Award"
        | "Publication"
        | "Scholarship"
        | "Volunteer"
        | "Speaker"
        | "Other";

    organization: string;

    date: Date;

    description?: string;

    url?: string;

    createdAt?: Date;

    updatedAt?: Date;
}
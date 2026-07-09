import type { Types } from "mongoose";

export interface IExperience {

    userId: Types.ObjectId;

    company: string;

    jobTitle: string;

    employmentType:
        | "Internship"
        | "Full-Time"
        | "Part-Time"
        | "Freelance"
        | "Contract";

    location?: string;

    currentlyWorking: boolean;

    startDate: Date;

    endDate?: Date;

    description?: string;

    technologies: string[];

    createdAt?: Date;

    updatedAt?: Date;
}
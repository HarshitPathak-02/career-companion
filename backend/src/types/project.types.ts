import type { Types } from "mongoose";

export interface IProject {
    userId: Types.ObjectId;

    title: string;

    description: string;

    technologies: string[];

    githubUrl?: string;

    liveUrl?: string;

    imageUrl?: string;

    startDate?: Date;

    endDate?: Date;

    currentlyWorking: boolean;

    featured: boolean;

    createdAt?: Date;

    updatedAt?: Date;
}
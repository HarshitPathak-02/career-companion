import type { Types } from "mongoose";

export interface IEducation {
    userId: Types.ObjectId;

    institution: string;

    degree: string;

    fieldOfStudy: string;

    startDate: Date;

    endDate?: Date;

    currentlyStudying: boolean;

    grade?: string;

    description?: string;

    createdAt?: Date;

    updatedAt?: Date;
}
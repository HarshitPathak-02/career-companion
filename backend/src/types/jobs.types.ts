import {
    HydratedDocument,
    Types,
} from "mongoose";


export type JobStatus =
    | "Saved"
    | "Applied"
    | "OA"
    | "Interview"
    | "Offer"
    | "Rejected"
    | "Withdrawn";


export type JobType =
    | "Full-Time"
    | "Part-Time"
    | "Internship"
    | "Contract"
    | "Freelance";


export interface IJobApplication {

    userId: Types.ObjectId;


    company: string;

    role: string;


    jobType: JobType;


    location?: string;


    jobUrl?: string;


    description?: string;


    status: JobStatus;


    appliedDate?: Date;


    resumeId?: Types.ObjectId;


    notes?: string;


    createdAt?: Date;

    updatedAt?: Date;

}


export type JobDocument =
    HydratedDocument<IJobApplication>;
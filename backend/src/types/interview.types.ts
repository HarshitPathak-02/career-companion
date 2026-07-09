import {
    HydratedDocument,
    Types,
} from "mongoose";


export type InterviewType =
    | "HR"
    | "Technical"
    | "Machine Coding"
    | "System Design"
    | "Managerial"
    | "Behavioral";


export type InterviewMode =
    | "Online"
    | "Offline";


export type InterviewStatus =
    | "Scheduled"
    | "Completed"
    | "Passed"
    | "Failed"
    | "Cancelled";



export interface IInterview {


    userId: Types.ObjectId;


    jobId?: Types.ObjectId;


    company: string;


    role: string;


    round: string;


    type: InterviewType;


    scheduledAt: Date;


    mode: InterviewMode;


    meetingLink?: string;


    location?: string;


    notes?: string;


    feedback?: string;


    status: InterviewStatus;


    createdAt?: Date;

    updatedAt?: Date;

}



export type InterviewDocument =
    HydratedDocument<IInterview>;
import { HydratedDocument, Types } from "mongoose";

export type ActivityAction =
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "LOGIN"
    | "LOGOUT"
    | "UPLOAD"
    | "DOWNLOAD"
    | "GENERATE";

export type ActivityEntity =
    | "PROFILE"
    | "SKILL"
    | "EDUCATION"
    | "EXPERIENCE"
    | "PROJECT"
    | "CERTIFICATION"
    | "ACHIEVEMENT"
    | "RESUME"
    | "ATS"
    | "JOB"
    | "USER"
    | "ATS_REPORT";

export interface IActivity {

    userId: Types.ObjectId;

    action: ActivityAction;

    entity: ActivityEntity;

    entityId?: Types.ObjectId;

    metadata?: Record<string, unknown>;

    ipAddress?: string;

    userAgent?: string;

    createdAt?: Date;

    updatedAt?: Date;
}

export type ActivityDocument =
    HydratedDocument<IActivity>;
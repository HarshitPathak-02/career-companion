import { HydratedDocument, Types } from "mongoose";

export type NotificationType =
    | "system"
    | "profile"
    | "resume"
    | "job"
    | "ats"
    | "ai"
    | "skill-gap";

export interface INotification {

    userId: Types.ObjectId;

    title: string;

    message: string;

    type: NotificationType;

    isRead: boolean;

    metadata?: Record<string, unknown>;

    createdAt?: Date;

    updatedAt?: Date;
}

export type NotificationDocument =
    HydratedDocument<INotification>;
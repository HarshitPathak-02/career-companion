import { Schema, model } from "mongoose";
import type { INotification } from "../types/notification.types.js";

const notificationSchema =
    new Schema<INotification>(
        {

            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            title: {
                type: String,
                required: true,
                trim: true,
                maxlength: 150,
            },

            message: {
                type: String,
                required: true,
                trim: true,
                maxlength: 500,
            },

            type: {
                type: String,
                enum: [
                    "system",
                    "profile",
                    "resume",
                    "job",
                    "ats",
                    "ai",
                    "skill-gap",
                ],
                default: "system",
            },

            isRead: {
                type: Boolean,
                default: false,
            },

            metadata: {
                type: Schema.Types.Mixed,
            },

        },
        {
            timestamps: true,
        }
    );

export const Notification =
    model<INotification>(
        "Notification",
        notificationSchema
    );
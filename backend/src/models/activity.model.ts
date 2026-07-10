import { Schema, model } from "mongoose";
import type { IActivity } from "../types/activity.types.js";

const activitySchema = new Schema<IActivity>(
    {

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        action: {
            type: String,
            enum: [
                "CREATE",
                "UPDATE",
                "DELETE",
                "LOGIN",
                "LOGOUT",
                "UPLOAD",
                "DOWNLOAD",
                "GENERATE",
            ],
            required: true,
        },

        entity: {
            type: String,
            enum: [
                "PROFILE",
                "SKILL",
                "EDUCATION",
                "EXPERIENCE",
                "PROJECT",
                "CERTIFICATION",
                "ACHIEVEMENT",
                "RESUME",
                "ATS",
                "JOB",
                "USER",
                "ATS_REPORT",
                "SKILL_GAP",
                "RESUME_REVIEW",
                "INTERVIEW_PREPARATION"
            ],
            required: true,
        },

        entityId: {
            type: Schema.Types.ObjectId,
        },

        metadata: {
            type: Schema.Types.Mixed,
        },

        ipAddress: {
            type: String,
        },

        userAgent: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

activitySchema.index({
    userId: 1,
    createdAt: -1,
});

export const Activity =
    model<IActivity>(
        "Activity",
        activitySchema
    );
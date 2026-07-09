import { Schema, model } from "mongoose";
import type { ICertification } from "../types/certification.types.js";

const certificationSchema = new Schema<ICertification>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        issuingOrganization: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        issueDate: {
            type: Date,
            required: true,
        },

        expiryDate: {
            type: Date,
        },

        credentialId: {
            type: String,
            trim: true,
        },

        credentialUrl: {
            type: String,
            trim: true,
        },

        doesNotExpire: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Certification = model<ICertification>(
    "Certification",
    certificationSchema
);
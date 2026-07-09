import { Schema, model } from "mongoose";
import type { IResume } from "../types/resume.types.js";

const resumeSchema = new Schema<IResume>(
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
            maxlength: 100,
        },

        summary: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        design: {

            template: {
                type: String,
                enum: [
                    "classic",
                    "modern",
                    "minimal",
                    "professional",
                    "developer",
                ],
                default: "modern",
            },

            theme: {
                type: String,
                default: "default",
            },

            primaryColor: {
                type: String,
                default: "#2563EB",
            },

            fontFamily: {
                type: String,
                default: "Inter",
            },

            fontSize: {
                type: Number,
                default: 14,
                min: 10,
                max: 18,
            },

            lineSpacing: {
                type: Number,
                default: 1.5,
                min: 1,
                max: 2.5,
            },

            margin: {
                type: Number,
                default: 24,
                min: 10,
                max: 50,
            },

            pageSize: {
                type: String,
                enum: ["A4", "Letter"],
                default: "A4",
            },
        },

        sections: {

            summary: {
                type: Boolean,
                default: true,
            },

            education: {
                type: Boolean,
                default: true,
            },

            experience: {
                type: Boolean,
                default: true,
            },

            projects: {
                type: Boolean,
                default: true,
            },

            skills: {
                type: Boolean,
                default: true,
            },

            certifications: {
                type: Boolean,
                default: true,
            },

            achievements: {
                type: Boolean,
                default: true,
            },

            languages: {
                type: Boolean,
                default: true,
            },
        },

        sectionOrder: [{
            type: String,
            enum: [
                "summary",
                "education",
                "experience",
                "projects",
                "skills",
                "certifications",
                "achievements",
                "languages",
            ],
        }],

        educationIds: [{
            type: Schema.Types.ObjectId,
            ref: "Education",
        }],

        experienceIds: [{
            type: Schema.Types.ObjectId,
            ref: "Experience",
        }],

        projectIds: [{
            type: Schema.Types.ObjectId,
            ref: "Project",
        }],

        certificationIds: [{
            type: Schema.Types.ObjectId,
            ref: "Certification",
        }],

        achievementIds: [{
            type: Schema.Types.ObjectId,
            ref: "Achievement",
        }],

        skillIds: [{
            type: Schema.Types.ObjectId,
            ref: "Skill",
        }],

        atsScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        pdfUrl: {
            type: String,
            trim: true,
        },

        thumbnailUrl: {
            type: String,
            trim: true,
        },

        visibility: {
            type: String,
            enum: ["private", "public"],
            default: "private",
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

resumeSchema.index({
    userId: 1,
});

resumeSchema.index({
    userId: 1,
    isDefault: 1,
});

resumeSchema.index({
    userId: 1,
    createdAt: -1,
});

export const Resume = model<IResume>(
    "Resume",
    resumeSchema
);
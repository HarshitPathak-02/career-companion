import { Schema, model } from "mongoose";
import type { IProfile } from "../types/profile.types.js";

const profileSchema = new Schema<IProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        headline: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        phone: {
            type: String,
            trim: true,
        },

        dateOfBirth: Date,

        gender: {
            type: String,
            enum: [
                "male",
                "female",
                "other",
            ],
        },

        location: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        languages: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },

                proficiency: {
                    type: String,
                    enum: [
                        "Beginner",
                        "Intermediate",
                        "Professional",
                        "Native",
                    ],
                    default: "Beginner",
                },
            },
        ],

        socialLinks: {

            github: {
                type: String,
                trim: true,
            },

            linkedin: {
                type: String,
                trim: true,
            },

            portfolio: {
                type: String,
                trim: true,
            },

            leetcode: {
                type: String,
                trim: true,
            },

            codeforces: {
                type: String,
                trim: true,
            },

            codechef: {
                type: String,
                trim: true,
            },

            hackerrank: {
                type: String,
                trim: true,
            },

            geeksforgeeks: {
                type: String,
                trim: true,
            },

            x: {
                type: String,
                trim: true,
            },
        },

        profileCompletion: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = model<IProfile>(
    "Profile",
    profileSchema
);
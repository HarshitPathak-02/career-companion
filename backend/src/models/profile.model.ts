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

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    linkedinUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    portfolioUrl: {
      type: String,
      trim: true,
    },

    resumeUrl: {
      type: String,
      trim: true,
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
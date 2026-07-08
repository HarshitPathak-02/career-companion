import { Schema, model } from "mongoose";
import {
    IUser,
    UserMethods,
    UserModel,
} from "../types/user.types.js";
import { USER_ROLES } from "../constants/roles.js";

import bcrypt from "bcrypt";

const userSchema = new Schema<IUser, UserModel, UserMethods>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.STUDENT,
        },

        avatar: {
            type: String,
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({
    email: 1,
});

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);

});

userSchema.method(
    "comparePassword",
    async function (candidatePassword: string) {
        return bcrypt.compare(candidatePassword, this.password);
    }
);

export const User = model<IUser, UserModel>(
    "User",
    userSchema
);
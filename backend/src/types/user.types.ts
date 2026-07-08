import { HydratedDocument, Model } from "mongoose";
import { USER_ROLES } from "../constants/roles.js";

export interface IUser {
  fullName: string;
  email: string;
  password: string;

  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];

  avatar?: string;

  isEmailVerified: boolean;

  profileCompleted: boolean;

  refreshToken?: string;

  lastLogin?: Date;
}

export interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser, {}, UserMethods> {}

export type UserDocument = HydratedDocument<IUser, UserMethods>;
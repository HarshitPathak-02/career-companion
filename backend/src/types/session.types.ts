import { HydratedDocument, Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;

  refreshToken: string;

  device?: string;

  ipAddress?: string;

  userAgent?: string;

  expiresAt: Date;

  isRevoked: boolean;
}

export type SessionDocument = HydratedDocument<ISession>;
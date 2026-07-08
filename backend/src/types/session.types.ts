import { HydratedDocument } from "mongoose";

export interface ISession {
  userId: string;

  refreshToken: string;

  device?: string;

  ipAddress?: string;

  userAgent?: string;

  expiresAt: Date;

  isRevoked: boolean;
}

export type SessionDocument = HydratedDocument<ISession>;
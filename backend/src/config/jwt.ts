import { env } from "./env.js";
import type { StringValue } from "ms";

export type JwtExpiry = StringValue | number;

export const jwtConfig = {
  accessTokenSecret: env.JWT_ACCESS_SECRET,
  refreshTokenSecret: env.JWT_REFRESH_SECRET,

  accessTokenExpiresIn: env.JWT_ACCESS_EXPIRES as JwtExpiry,
  refreshTokenExpiresIn: env.JWT_REFRESH_EXPIRES as JwtExpiry,
} as const;
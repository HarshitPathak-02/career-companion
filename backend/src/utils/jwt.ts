import jwt from "jsonwebtoken";

import { jwtConfig, type JwtExpiry } from "../config/jwt.js";

export interface JwtPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiresIn as JwtExpiry,
  });
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiresIn as JwtExpiry,
  });
};
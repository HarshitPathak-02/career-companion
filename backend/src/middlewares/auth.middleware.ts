import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";

export const protect = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            throw new AppError("Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

        const payload = verifyAccessToken(token);

        const user = await User.findById(payload.userId);

        if (!user) {
            throw new AppError("User no longer exists", 401);
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        next(new AppError("Unauthorized", 401));
    }
};
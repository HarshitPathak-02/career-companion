import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/app-error.js";

export const validateObjectId =
  (paramName = "id") =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const id = req.params[paramName];

    if (
      typeof id !== "string" ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      throw new AppError("Invalid ID", 400);
    }

    next();
  };
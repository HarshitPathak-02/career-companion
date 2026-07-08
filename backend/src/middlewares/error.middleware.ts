import {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../utils/app-error.js";


export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {

  console.error(err);


  // MongoDB duplicate key error
  if (err.code === 11000) {

    const field =
      Object.keys(err.keyPattern)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }


  // Known application errors
  if (err instanceof AppError) {

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

  }


  // Default error

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
import { Request, Response } from "express";

import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { RefreshTokenInput } from "../validations/auth.validation.js";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await AuthService.register(req.body);

    return res.status(201).json(
      successResponse(
        "User registered successfully",
        user
      )
    );
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    return res.status(200).json(
      successResponse(
        "Login successful",
        result
      )
    );
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {

    const result = await AuthService.refreshToken(
      req.body as RefreshTokenInput
    );

    return res.status(200).json(
      successResponse(
        "Token refreshed successfully",
        result
      )
    );
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response) => {
    await AuthService.logout(req.body);

    return res.status(200).json(
      successResponse("Logged out successfully")
    );
  }
);

export const logoutAll = asyncHandler(
  async (req: Request, res: Response) => {

    await AuthService.logoutAll(
      req.user!.id
    );

    return res.status(200).json(
      successResponse(
        "Logged out from all devices"
      )
    );
  }
);
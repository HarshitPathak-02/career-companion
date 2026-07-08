import { Session } from "../models/session.models.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/app-error.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";
import type { LoginInput, LogoutInput, RefreshTokenInput, RegisterInput } from "../validations/auth.validation.js";

export class AuthService {
    static async register(data: RegisterInput) {
        // Check if email already exists
        const existingUser = await User.findOne({
            email: data.email,
        });

        if (existingUser) {
            throw new AppError(
                "Email already registered",
                409
            );
        }

        // Create user
        const user = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        });

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            profileCompleted: user.profileCompleted,
        };
    }

    static async login(data: LoginInput) {
        const user = await User.findOne({
            email: data.email,
        }).select("+password");;

        if (!user) {
            throw new AppError(
                "Invalid email or password",
                401
            );
        }

        const isPasswordValid =
            await comparePassword(
                data.password,
                user.password
            );

        if (!isPasswordValid) {
            throw new AppError(
                "Invalid email or password",
                401
            );
        }

        const accessToken =
            generateAccessToken({
                userId: user.id,
                role: user.role,
            });

        const refreshToken =
            generateRefreshToken({
                userId: user.id,
                role: user.role,
            });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt
        });

        user.lastLogin = new Date();
        user.refreshToken = refreshToken;

        await user.save();

        return {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                profileCompleted: user.profileCompleted,
            },
            accessToken,
            refreshToken,
        };
    }
    static async refreshToken(data: RefreshTokenInput) {
        const payload = verifyRefreshToken(data.refreshToken);

        const session = await Session.findOne({
            refreshToken: data.refreshToken,
            isRevoked: false,
        });

        if (!session) {
            throw new AppError("Invalid refresh token", 401);
        }

        if (session.expiresAt < new Date()) {
            throw new AppError("Refresh token expired", 401);
        }

        const user = await User.findById(payload.userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const accessToken = generateAccessToken({
            userId: user.id,
            role: user.role,
        });

        return {
            accessToken,
        };
    }

    static async logout(data: LogoutInput) {
        const session = await Session.findOne({
            refreshToken: data.refreshToken,
            isRevoked: false,
        });

        if (!session) {
            throw new AppError(
                "Session not found",
                404
            );
        }

        session.isRevoked = true;
        await session.save();

        await User.findByIdAndUpdate(
            session.userId,
            {
                refreshToken: undefined,
            }
        );

        return null;
    }

    static async logoutAll(userId: string) {
        await Session.updateMany(
            {
                userId,
                isRevoked: false,
            },
            {
                $set: {
                    isRevoked: true,
                },
            }
        );

        await User.findByIdAndUpdate(userId, {
            refreshToken: undefined,
        });

        return null;
    }
}
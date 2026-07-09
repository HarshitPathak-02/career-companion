import "dotenv/config";
import { getEnv } from "../utils/getEnv.js";

export const env = {
    PORT: Number(process.env.PORT) || 5000,

    NODE_ENV: process.env.NODE_ENV || "development",

    MONGODB_URI:
        process.env.MONGODB_URI ||
        "mongodb://127.0.0.1:27017/career-companion",
    JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),

    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),

    JWT_ACCESS_EXPIRES: getEnv("JWT_ACCESS_EXPIRES"),

    JWT_REFRESH_EXPIRES: getEnv("JWT_REFRESH_EXPIRES"),
    CLOUDINARY_CLOUD_NAME:
        getEnv("CLOUDINARY_CLOUD_NAME"),

    CLOUDINARY_API_KEY:
        getEnv("CLOUDINARY_API_KEY"),

    CLOUDINARY_API_SECRET:
        getEnv("CLOUDINARY_API_SECRET"),
};
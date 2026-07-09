import { NextFunction, Request, Response } from "express";

import multer from "multer";
import { upload } from "../utils/multer.js";
import { AppError } from "../utils/app-error.js";

function fileValidator(
    allowedMimeTypes: string[]
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        upload.single("file")(
            req,
            res,
            (err) => {

                if (err instanceof multer.MulterError) {

                    if (
                        err.code ===
                        "LIMIT_FILE_SIZE"
                    ) {
                        return next(
                            new AppError(
                                "File size exceeds 10 MB",
                                400
                            )
                        );
                    }

                    return next(
                        new AppError(
                            err.message,
                            400
                        )
                    );
                }

                if (err) {
                    return next(err);
                }

                if (!req.file) {
                    return next(
                        new AppError(
                            "File is required",
                            400
                        )
                    );
                }

                if (
                    !allowedMimeTypes.includes(
                        req.file.mimetype
                    )
                ) {
                    return next(
                        new AppError(
                            "Invalid file type",
                            400
                        )
                    );
                }

                next();
            }
        );
    };
}

export const uploadProfileImage =
    fileValidator([
        "image/jpeg",
        "image/png",
        "image/webp",
    ]);

export const uploadResume =
    fileValidator([
        "application/pdf",
    ]);

export const uploadProjectImage =
    fileValidator([
        "image/jpeg",
        "image/png",
        "image/webp",
    ]);

export const uploadCertificate =
    fileValidator([
        "application/pdf",
        "image/jpeg",
        "image/png",
    ]);
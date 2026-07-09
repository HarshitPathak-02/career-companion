import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { CertificationService } from "../services/certification.service.js";
import { AppError } from "../utils/app-error.js";

export const createCertification = asyncHandler(
    async (req: Request, res: Response) => {

        const certification =
            await CertificationService.createCertification(
                req.user.id,
                req.body
            );

        return res.status(201).json(
            successResponse(
                "Certification created successfully",
                certification
            )
        );
    }
);

export const getCertifications = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await CertificationService.getCertifications(
                req.user.id,
                {

                    ...(req.query.page && {
                        page: Number(req.query.page),
                    }),

                    ...(req.query.limit && {
                        limit: Number(req.query.limit),
                    }),

                    ...(typeof req.query.search === "string" && {
                        search: req.query.search,
                    }),

                    ...(typeof req.query.sort === "string" && {
                        sort: req.query.sort,
                    }),

                }
            );

        return res.status(200).json(
            successResponse(
                "Certifications fetched successfully",
                result
            )
        );
    }
);

export const updateCertification = asyncHandler(
    async (req: Request, res: Response) => {

        const certificationId = req.params.id;

        if (typeof certificationId !== "string") {
            throw new AppError(
                "Invalid Certification ID",
                400
            );
        }

        const certification =
            await CertificationService.updateCertification(
                req.user.id,
                certificationId,
                req.body
            );

        return res.status(200).json(
            successResponse(
                "Certification updated successfully",
                certification
            )
        );
    }
);

export const deleteCertification = asyncHandler(
    async (req: Request, res: Response) => {

        const certificationId = req.params.id;

        if (typeof certificationId !== "string") {
            throw new AppError(
                "Invalid Certification ID",
                400
            );
        }

        await CertificationService.deleteCertification(
            req.user.id,
            certificationId
        );

        return res.status(200).json(
            successResponse(
                "Certification deleted successfully"
            )
        );
    }
);
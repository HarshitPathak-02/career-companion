import { Certification } from "../models/certifications.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateCertificationInput,
    UpdateCertificationInput,
} from "../validations/certification.validation.js";

export class CertificationService {

    static async createCertification(
        userId: string,
        data: CreateCertificationInput
    ) {

        const certificationData = {

            userId,

            name: data.name,
            issuingOrganization:
                data.issuingOrganization,
            issueDate: data.issueDate,
            doesNotExpire:
                data.doesNotExpire,

            ...(data.expiryDate !== undefined && {
                expiryDate: data.expiryDate,
            }),

            ...(data.credentialId !== undefined && {
                credentialId:
                    data.credentialId,
            }),

            ...(data.credentialUrl !== undefined && {
                credentialUrl:
                    data.credentialUrl,
            }),
        };

        return Certification.create(
            certificationData
        );
    }

    static async getCertifications(
        userId: string,
        options: {
            page?: number;
            limit?: number;
            search?: string;
            sort?: string;
        }
    ) {

        const searchQuery =
            buildSearchQuery(
                [
                    "name",
                    "issuingOrganization",
                ],
                options.search
            );

        return paginate(
            Certification,
            {
                userId,
                ...searchQuery,
            },
            {

                ...(options.page !== undefined && {
                    page: options.page,
                }),

                ...(options.limit !== undefined && {
                    limit: options.limit,
                }),

                sort:
                    buildSortQuery(
                        options.sort
                    ),
            }
        );
    }

    static async updateCertification(
        userId: string,
        certificationId: string,
        data: UpdateCertificationInput
    ) {

        const certification =
            await Certification.findOneAndUpdate(
                {
                    _id: certificationId,
                    userId,
                },
                {
                    $set: data,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!certification) {
            throw new AppError(
                "Certification not found",
                404
            );
        }

        return certification;
    }

    static async deleteCertification(
        userId: string,
        certificationId: string
    ) {

        const certification =
            await Certification.findOneAndDelete(
                {
                    _id: certificationId,
                    userId,
                }
            );

        if (!certification) {
            throw new AppError(
                "Certification not found",
                404
            );
        }

        return null;
    }

}
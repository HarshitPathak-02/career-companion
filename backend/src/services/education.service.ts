import { Education } from "../models/education.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateEducationInput,
    UpdateEducationInput,
} from "../validations/education.validation.js";

export class EducationService {

    static async createEducation(
        userId: string,
        data: CreateEducationInput
    ) {

        const educationData = {
            userId,

            institution: data.institution,
            degree: data.degree,
            fieldOfStudy: data.fieldOfStudy,
            startDate: data.startDate,
            currentlyStudying: data.currentlyStudying,

            ...(data.endDate !== undefined && {
                endDate: data.endDate,
            }),

            ...(data.grade !== undefined && {
                grade: data.grade,
            }),

            ...(data.description !== undefined && {
                description: data.description,
            }),
        };

        return Education.create(educationData);
    }


    static async getEducation(
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
                    "institution",
                    "degree",
                    "fieldOfStudy",
                ],
                options.search
            );

        return paginate(
            Education,
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

                sort: buildSortQuery(
                    options.sort
                ),
            }
        );
    }


    static async updateEducation(
        userId: string,
        educationId: string,
        data: UpdateEducationInput
    ) {

        const education =
            await Education.findOneAndUpdate(
                {
                    _id: educationId,
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

        if (!education) {
            throw new AppError(
                "Education not found",
                404
            );
        }

        return education;
    }


    static async deleteEducation(
        userId: string,
        educationId: string
    ) {

        const education =
            await Education.findOneAndDelete({
                _id: educationId,
                userId,
            });

        if (!education) {
            throw new AppError(
                "Education not found",
                404
            );
        }

        return null;
    }

}
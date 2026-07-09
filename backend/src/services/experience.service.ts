import { Experience } from "../models/experience.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateExperienceInput,
    UpdateExperienceInput,
} from "../validations/experience.validation.js";

export class ExperienceService {

    static async createExperience(
        userId: string,
        data: CreateExperienceInput
    ) {

        const experienceData = {

            userId,

            company: data.company,
            jobTitle: data.jobTitle,
            employmentType: data.employmentType,
            startDate: data.startDate,
            currentlyWorking: data.currentlyWorking,
            technologies: data.technologies,

            ...(data.location !== undefined && {
                location: data.location,
            }),

            ...(data.endDate !== undefined && {
                endDate: data.endDate,
            }),

            ...(data.description !== undefined && {
                description: data.description,
            }),
        };

        return Experience.create(experienceData);
    }


    static async getExperience(
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
                    "company",
                    "jobTitle",
                    "description",
                ],
                options.search
            );

        return paginate(
            Experience,
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


    static async updateExperience(
        userId: string,
        experienceId: string,
        data: UpdateExperienceInput
    ) {

        const experience =
            await Experience.findOneAndUpdate(
                {
                    _id: experienceId,
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

        if (!experience) {
            throw new AppError(
                "Experience not found",
                404
            );
        }

        return experience;
    }


    static async deleteExperience(
        userId: string,
        experienceId: string
    ) {

        const experience =
            await Experience.findOneAndDelete({
                _id: experienceId,
                userId,
            });

        if (!experience) {
            throw new AppError(
                "Experience not found",
                404
            );
        }

        return null;
    }

}
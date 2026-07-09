import { Achievement } from "../models/achievement.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateAchievementInput,
    UpdateAchievementInput,
} from "../validations/achievement.validation.js";

export class AchievementService {

    static async createAchievement(
        userId: string,
        data: CreateAchievementInput
    ) {

        const achievementData = {

            userId,

            title: data.title,
            type: data.type,
            organization: data.organization,
            date: data.date,

            ...(data.description !== undefined && {
                description: data.description,
            }),

            ...(data.url !== undefined && {
                url: data.url,
            }),
        };

        return Achievement.create(
            achievementData
        );
    }

    static async getAchievements(
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
                    "title",
                    "organization",
                    "description",
                ],
                options.search
            );

        return paginate(
            Achievement,
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

    static async updateAchievement(
        userId: string,
        achievementId: string,
        data: UpdateAchievementInput
    ) {

        const achievement =
            await Achievement.findOneAndUpdate(
                {
                    _id: achievementId,
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

        if (!achievement) {
            throw new AppError(
                "Achievement not found",
                404
            );
        }

        return achievement;
    }

    static async deleteAchievement(
        userId: string,
        achievementId: string
    ) {

        const achievement =
            await Achievement.findOneAndDelete(
                {
                    _id: achievementId,
                    userId,
                }
            );

        if (!achievement) {
            throw new AppError(
                "Achievement not found",
                404
            );
        }

        return null;
    }
}
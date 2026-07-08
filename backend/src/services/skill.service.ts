import { Skill } from "../models/skill.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import type {
    CreateSkillInput,
    UpdateSkillInput,
} from "../validations/skill.validation.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

export class SkillService {
    static async createSkill(
        userId: string,
        data: CreateSkillInput
    ) {

        return Skill.create({
            userId,
            ...data,
        });
    }

    static async getSkills(
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
                ["name"],
                options.search
            );


        return paginate(
            Skill,
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
    static async updateSkill(
        userId: string,
        skillId: string,
        data: UpdateSkillInput
    ) {
        const skill =
            await Skill.findOneAndUpdate(
                {
                    _id: skillId,
                    userId,
                },
                {
                    $set: data,
                },
                {
                    new: true,
                }
            );

        if (!skill) {
            throw new AppError(
                "Skill not found",
                404
            );
        }

        return skill;
    }

    static async deleteSkill(
        userId: string,
        skillId: string
    ) {
        const skill =
            await Skill.findOneAndDelete({
                _id: skillId,
                userId,
            });

        if (!skill) {
            throw new AppError(
                "Skill not found",
                404
            );
        }

        return null;
    }
}
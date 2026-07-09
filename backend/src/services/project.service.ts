import { Project } from "../models/project.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateProjectInput,
    UpdateProjectInput,
} from "../validations/project.validation.js";

export class ProjectService {

    static async createProject(
        userId: string,
        data: CreateProjectInput
    ) {

        const projectData = {

            userId,

            title: data.title,
            description: data.description,
            technologies: data.technologies,
            currentlyWorking: data.currentlyWorking,
            featured: data.featured,

            ...(data.githubUrl !== undefined && {
                githubUrl: data.githubUrl,
            }),

            ...(data.liveUrl !== undefined && {
                liveUrl: data.liveUrl,
            }),

            ...(data.imageUrl !== undefined && {
                imageUrl: data.imageUrl,
            }),

            ...(data.startDate !== undefined && {
                startDate: data.startDate,
            }),

            ...(data.endDate !== undefined && {
                endDate: data.endDate,
            }),
        };

        return Project.create(projectData);
    }

    static async getProjects(
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
                    "description",
                    "technologies",
                ],
                options.search
            );

        return paginate(
            Project,
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

    static async updateProject(
        userId: string,
        projectId: string,
        data: UpdateProjectInput
    ) {

        const project =
            await Project.findOneAndUpdate(
                {
                    _id: projectId,
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

        if (!project) {
            throw new AppError(
                "Project not found",
                404
            );
        }

        return project;
    }

    static async deleteProject(
        userId: string,
        projectId: string
    ) {

        const project =
            await Project.findOneAndDelete({
                _id: projectId,
                userId,
            });

        if (!project) {
            throw new AppError(
                "Project not found",
                404
            );
        }

        return null;
    }

}
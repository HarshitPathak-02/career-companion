import { Types } from "mongoose";

import { Resume } from "../models/resume.model.js";
import { Education } from "../models/education.model.js";
import { Experience } from "../models/experience.model.js";
import { Project } from "../models/project.model.js";
import { Skill } from "../models/skill.model.js";
import { Certification } from "../models/certifications.model.js";
import { Achievement } from "../models/achievement.model.js";

import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    CreateResumeInput,
    UpdateResumeInput,
} from "../validations/resume.validation.js";

import { NotificationService } from "./notification.service.js";
import { ActivityService } from "./activity.service.js";
import { PopulatedResume } from "../types/resumeAI.types.js";

export class ResumeService {

    private static async validateOwnership(
        userId: string,
        data: CreateResumeInput | UpdateResumeInput
    ) {

        const validateIds = async (
            ids: string[] | undefined,
            model: any,
            entity: string
        ) => {

            if (!ids || ids.length === 0) {
                return;
            }

            const count =
                await model.countDocuments({
                    _id: {
                        $in: ids.map(
                            id =>
                                new Types.ObjectId(
                                    id
                                )
                        ),
                    },
                    userId,
                });

            if (count !== ids.length) {
                throw new AppError(
                    `One or more ${entity} records are invalid.`,
                    400
                );
            }

        };

        await validateIds(
            data.educationIds,
            Education,
            "education"
        );

        await validateIds(
            data.experienceIds,
            Experience,
            "experience"
        );

        await validateIds(
            data.projectIds,
            Project,
            "project"
        );

        await validateIds(
            data.skillIds,
            Skill,
            "skill"
        );

        await validateIds(
            data.certificationIds,
            Certification,
            "certification"
        );

        await validateIds(
            data.achievementIds,
            Achievement,
            "achievement"
        );

    }

    static async createResume(
        userId: string,
        data: CreateResumeInput
    ) {

        await this.validateOwnership(
            userId,
            data
        );

        if (data.isDefault) {

            await Resume.updateMany(
                {
                    userId,
                    isDefault: true,
                },
                {
                    $set: {
                        isDefault: false,
                    },
                }
            );

        }

        const resumeData = {

            userId,

            title: data.title,

            ...(data.summary !== undefined && {
                summary: data.summary,
            }),

            design: data.design,

            sections: data.sections,

            sectionOrder: data.sectionOrder,

            educationIds: data.educationIds,

            experienceIds: data.experienceIds,

            projectIds: data.projectIds,

            certificationIds: data.certificationIds,

            achievementIds: data.achievementIds,

            skillIds: data.skillIds,

            visibility: data.visibility,

            isDefault: data.isDefault,

        };

        const resume = await Resume.create(resumeData);

        await NotificationService.createNotification({

            userId,

            title:
                "Resume Created",

            message:
                `"${resume.title}" has been created successfully.`,

            type: "resume",

            metadata: {
                resumeId:
                    resume._id.toString(),
            },

        });

        await ActivityService.log({

            userId,

            action: "CREATE",

            entity: "RESUME",

            entityId:
                resume._id.toString(),

            metadata: {
                title: resume.title,
            },

        });

        return resume;

    }
    static async getResumes(
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
                ["title"],
                options.search
            );

        return paginate(
            Resume,
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

    static async getResumeById(
        userId: string,
        resumeId: string
    ) {

        const resume =
            await Resume.findOne({
                _id: resumeId,
                userId,
            });

        if (!resume) {
            throw new AppError(
                "Resume not found",
                404
            );
        }

        return resume;

    }

    static async updateResume(
        userId: string,
        resumeId: string,
        data: UpdateResumeInput
    ) {

        await this.validateOwnership(
            userId,
            data
        );

        const existingResume =
            await Resume.findOne({
                _id: resumeId,
                userId,
            });

        if (!existingResume) {
            throw new AppError(
                "Resume not found",
                404
            );
        }

        if (data.isDefault) {

            await Resume.updateMany(
                {
                    userId,
                    isDefault: true,
                    _id: {
                        $ne: resumeId,
                    },
                },
                {
                    $set: {
                        isDefault: false,
                    },
                }
            );

        }

        const updatedResume =
            await Resume.findByIdAndUpdate(
                resumeId,
                {
                    $set: data,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!updatedResume) {
            throw new AppError(
                "Resume not found",
                404
            );
        }

        await NotificationService.createNotification({

            userId,

            title:
                "Resume Updated",

            message:
                `"${updatedResume.title}" has been updated successfully.`,

            type: "resume",

            metadata: {
                resumeId:
                    updatedResume._id.toString(),
            },

        });

        await ActivityService.log({

            userId,

            action: "UPDATE",

            entity: "RESUME",

            entityId:
                updatedResume._id.toString(),

            metadata: {
                title:
                    updatedResume.title,
            },

        });

        return updatedResume;

    }
    static async deleteResume(
        userId: string,
        resumeId: string
    ) {

        const resume =
            await Resume.findOne({
                _id: resumeId,
                userId,
            });

        if (!resume) {
            throw new AppError(
                "Resume not found",
                404
            );
        }

        const wasDefault =
            resume.isDefault;

        await Resume.deleteOne({
            _id: resumeId,
        });

        if (wasDefault) {

            const latestResume =
                await Resume.findOne({
                    userId,
                })
                    .sort({
                        createdAt: -1,
                    });

            if (latestResume) {

                latestResume.isDefault = true;

                await latestResume.save();

            }

        }

        await NotificationService.createNotification({

            userId,

            title:
                "Resume Deleted",

            message:
                `"${resume.title}" has been deleted successfully.`,

            type: "resume",

        });

        await ActivityService.log({

            userId,

            action: "DELETE",

            entity: "RESUME",

            entityId:
                resume._id.toString(),

            metadata: {
                title: resume.title,
            },

        });

        return null;

    }

    static async setDefaultResume(
        userId: string,
        resumeId: string
    ) {

        const resume =
            await Resume.findOne({
                _id: resumeId,
                userId,
            });

        if (!resume) {
            throw new AppError(
                "Resume not found",
                404
            );
        }

        await Resume.updateMany(
            {
                userId,
                isDefault: true,
            },
            {
                $set: {
                    isDefault: false,
                },
            }
        );

        resume.isDefault = true;

        await resume.save();

        await NotificationService.createNotification({

            userId,

            title:
                "Default Resume Updated",

            message:
                `"${resume.title}" is now your default resume.`,

            type: "resume",

            metadata: {
                resumeId:
                    resume._id.toString(),
            },

        });

        await ActivityService.log({

            userId,

            action: "UPDATE",

            entity: "RESUME",

            entityId:
                resume._id.toString(),

            metadata: {
                defaultResume: true,
                title: resume.title,
            },

        });

        return resume;

    }

    static async getPopulatedResume(
        userId: string,
        resumeId: string,
    ): Promise<PopulatedResume> {

        const resume =
            await Resume.findOne({
                _id: resumeId,
                userId,
            })
                .populate("educationIds")
                .populate("experienceIds")
                .populate("projectIds")
                .populate("skillIds")
                .populate("certificationIds")
                .populate("achievementIds");

        if (!resume) {
            throw new AppError(
                "Resume not found",
                404,
            );
        }

        return resume as unknown as PopulatedResume;

    }

}
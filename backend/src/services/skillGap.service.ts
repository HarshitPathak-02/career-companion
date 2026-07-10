import { SkillGap } from "../models/skillGap.model.js";

import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    AnalyzeSkillGapRequestInput,
} from "../validations/skillGap.validation.js";

import { ResumeService } from "./resume.service.js";
import { ResumeAIEngine } from "./resumeAI.service.js";
import { NotificationService } from "./notification.service.js";
import { ActivityService } from "./activity.service.js";

export class SkillGapService {

    static async analyzeSkillGap(
        userId: string,
        data: AnalyzeSkillGapRequestInput,
    ) {

        const resume =
            await ResumeService.getPopulatedResume(
                userId,
                data.resumeId,
            );

        const analysis =
            await ResumeAIEngine.analyzeSkillGap(
                resume,
                data.jobDescription,
            );

        const report =
            await SkillGap.create({

                userId,

                resumeId:
                    resume._id,

                jobDescription:
                    data.jobDescription,

                matchingSkills:
                    analysis.matchingSkills,

                missingSkills:
                    analysis.missingSkills,

                recommendedSkills:
                    analysis.recommendedSkills,

                learningRoadmap:
                    analysis.learningRoadmap,

                overallReadiness:
                    analysis.overallReadiness,

            });

        await NotificationService.createNotification({

            userId,

            title:
                "Skill Gap Analysis Completed",

            message:
                "Your skill gap analysis has been completed.",

            type:
                "skill-gap",

            metadata: {

                reportId:
                    report._id.toString(),

            },

        });

        await ActivityService.log({

            userId,

            action:
                "CREATE",

            entity:
                "SKILL_GAP",

            entityId:
                report._id.toString(),

            metadata: {

                resumeId:
                    resume._id.toString(),

            },

        });

        return report;

    }

    static async getReports(
        userId: string,
        options: {
            page?: number;
            limit?: number;
            search?: string;
            sort?: string;
        },
    ) {

        const searchQuery =
            buildSearchQuery(
                [
                    "jobDescription",
                ],
                options.search,
            );

        return paginate(

            SkillGap,

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
                        options.sort,
                    ),

            },

        );

    }

    static async getReportById(
        userId: string,
        reportId: string,
    ) {

        const report =
            await SkillGap.findOne({

                _id: reportId,

                userId,

            });

        if (!report) {

            throw new AppError(
                "Skill gap report not found",
                404,
            );

        }

        return report;

    }

    static async deleteReport(
        userId: string,
        reportId: string,
    ) {

        const report =
            await SkillGap.findOne({

                _id: reportId,

                userId,

            });

        if (!report) {

            throw new AppError(
                "Skill gap report not found",
                404,
            );

        }

        await SkillGap.deleteOne({

            _id: reportId,

        });

        await ActivityService.log({

            userId,

            action: "DELETE",

            entity: "SKILL_GAP",

            entityId: reportId,

            metadata: {

                resumeId:
                    report.resumeId.toString(),

            },

        });

        return null;

    }

}
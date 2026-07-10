import { ResumeReview } from "../models/resumeReview.model.js";
import { ResumeService } from "./resume.service.js";

import { ResumeAIEngine } from "./resumeAI.service.js";

import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";

import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import {
    NotificationService,
} from "./notification.service.js";

import {
    ActivityService,
} from "./activity.service.js";

import type {
    AnalyzeResumeReviewRequestInput,
} from "../validations/resumeReview.validation.js";

export class ResumeReviewService {

    static async analyzeResume(

        userId: string,

        data: AnalyzeResumeReviewRequestInput,

    ) {

        const resume =

            await ResumeService.getPopulatedResume(

                userId,

                data.resumeId,

            );

        if (!resume) {

            throw new AppError(

                "Resume not found",

                404,

            );

        }

        const analysis =

            await ResumeAIEngine.analyzeResumeReview(

                resume,

            );

        const report =

            await ResumeReview.create({

                userId,

                resumeId:

                    resume._id,

                ...analysis,

            });

        await NotificationService.createNotification({

            userId,

            title:

                "Resume Review Completed",

            message:

                "Your resume review has been generated successfully.",

            type:

                "resume",

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

                "RESUME_REVIEW",

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

                [],

                options.search,

            );

        return paginate(

            ResumeReview,

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

            await ResumeReview.findOne({

                _id: reportId,

                userId,

            });

        if (!report) {

            throw new AppError(

                "Resume review not found",

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

            await ResumeReview.findOne({

                _id: reportId,

                userId,

            });

        if (!report) {

            throw new AppError(

                "Resume review not found",

                404,

            );

        }

        await ResumeReview.deleteOne({

            _id: reportId,

        });

        await ActivityService.log({

            userId,

            action:

                "DELETE",

            entity:

                "RESUME_REVIEW",

            entityId:

                reportId,

        });

        return null;

    }

}
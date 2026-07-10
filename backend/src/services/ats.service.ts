import { ATSReport } from "../models/atsReport.model.js";
import { Resume } from "../models/resume.model.js";

import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";

import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    AnalyzeATSRequestInput,
} from "../validations/ats.validation.js";

import { NotificationService } from "./notification.service.js";
import { ActivityService } from "./activity.service.js";
import { ResumeService } from "./resume.service.js";
import { ResumeAIEngine } from "./resumeAI.service.js";


export class ATSService {


    private static async validateResumeOwnership(
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



    static async analyzeResume(
        userId: string,
        data: AnalyzeATSRequestInput,
    ) {

        const resume =
            await ResumeService.getPopulatedResume(
                userId,
                data.resumeId,
            );

        const analysis =
            await ResumeAIEngine.analyzeResume(
                resume,
                data.jobDescription,
            );

        const report =
            await ATSReport.create({

                userId,

                resumeId:
                    resume._id,

                jobDescription:
                    data.jobDescription,

                score:
                    analysis.score,

                matchedSkills:
                    analysis.matchedSkills,

                missingSkills:
                    analysis.missingSkills,

                keywordScore:
                    analysis.keywordScore,

                experienceScore:
                    analysis.experienceScore,

                formattingScore:
                    analysis.formattingScore,

                suggestions:
                    analysis.suggestions,

            });

        await NotificationService.createNotification({

            userId,

            title:
                "ATS Analysis Completed",

            message:
                "Your resume ATS analysis has been completed.",

            type:
                "ats",

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
                "ATS_REPORT",

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
        }
    ) {


        const searchQuery =
            buildSearchQuery(
                [
                    "jobDescription",
                ],
                options.search
            );



        return paginate(

            ATSReport,

            {
                userId,
                ...searchQuery,
            },


            {

                ...(options.page !== undefined && {

                    page:
                        options.page,

                }),


                ...(options.limit !== undefined && {

                    limit:
                        options.limit,

                }),


                sort:
                    buildSortQuery(
                        options.sort
                    ),

            }

        );

    }





    static async getReportById(
        userId: string,
        reportId: string
    ) {


        const report =
            await ATSReport.findOne({

                _id:
                    reportId,

                userId,

            });



        if (!report) {

            throw new AppError(

                "ATS report not found",

                404

            );

        }



        return report;

    }





    static async deleteReport(
        userId: string,
        reportId: string
    ) {


        const report =
            await ATSReport.findOne({

                _id:
                    reportId,

                userId,

            });



        if (!report) {

            throw new AppError(

                "ATS report not found",

                404

            );

        }



        await ATSReport.deleteOne({

            _id:
                reportId,

        });



        await ActivityService.log({

            userId,

            action:
                "DELETE",

            entity:
                "ATS_REPORT",

            entityId:
                reportId,

            metadata: {

                resumeId:
                    report.resumeId.toString(),

            },

        });



        return null;

    }

}
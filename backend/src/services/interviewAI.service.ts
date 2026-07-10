import { ResumeAIEngine } from "../services/resumeAI.service.js";

import { Resume } from "../models/resume.model.js";

import { AppError } from "../utils/app-error.js";

import type {
    InterviewAIResponse,
} from "../validations/interviewAI.validation.js";
import { PopulatedResume } from "../types/resumeAI.types.js";
import { InterviewPreparationReport } from "../models/interviewPreparationReport.model.js";
import { ActivityService } from "./activity.service.js";


export class InterviewAIService {


    private static async validateResumeOwnership(

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

                404

            );

        }


        return resume as unknown as PopulatedResume;

    }




    static async generateInterview(

        userId: string,

        resumeId: string,

    ): Promise<InterviewAIResponse> {


        const resume =

            await this.validateResumeOwnership(

                userId,

                resumeId,

            );



        const result =

            await ResumeAIEngine.generateInterview(

                resume,

            );



        const report =

            await InterviewPreparationReport.create({

                userId,

                resumeId,

                ...result,

            });



        return report;

    }
    static async getReports(

        userId: string

    ) {


        return InterviewPreparationReport

            .find({

                userId,

            })

            .sort({

                createdAt: -1,

            });


    }




    static async getReportById(

        userId: string,

        reportId: string

    ) {


        const report =

            await InterviewPreparationReport.findOne({

                _id: reportId,

                userId,

            });



        if (!report) {


            throw new AppError(

                "Interview preparation report not found",

                404

            );


        }



        return report;


    }
    static async deleteReport(

    userId: string,

    reportId: string,

) {


    const report =

        await InterviewPreparationReport.findOne({

            _id: reportId,

            userId,

        });



    if (!report) {


        throw new AppError(

            "Interview preparation report not found",

            404

        );


    }



    await InterviewPreparationReport.deleteOne({

        _id: reportId,

    });



    await ActivityService.log({

        userId,

        action: "DELETE",

        entity: "INTERVIEW_PREPARATION",

        entityId: reportId,

        metadata: {

            resumeId:
                report.resumeId.toString(),

        },

    });



    return null;

}

}
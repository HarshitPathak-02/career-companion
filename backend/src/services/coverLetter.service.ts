import {
    CoverLetterReport,
} from "../models/coverLetterReport.model.js";


import {
    Resume
} from "../models/resume.model.js";


import {
    ResumeAIEngine
} from "./resumeAI.service.js";


import {
    AppError
} from "../utils/app-error.js";
import { PopulatedResume } from "../types/resumeAI.types.js";



export class CoverLetterService {



    private static async validateResumeOwnership(

        userId: string,

        resumeId: string

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





    static async generate(

        userId: string,

        resumeId: string,

        jobDescription: string,

    ) {



        const resume =

            await this.validateResumeOwnership(

                userId,

                resumeId

            );



        const result =

            await ResumeAIEngine.generateCoverLetter(

                resume,

                jobDescription

            );



        const report =

            await CoverLetterReport.create({

                userId,

                resumeId,

                jobDescription,

                ...result,

            });



        return report;


    }
    static async getReports(

        userId: string

    ) {

        return CoverLetterReport

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

            await CoverLetterReport.findOne({

                _id: reportId,

                userId,

            });



        if (!report) {

            throw new AppError(

                "Cover letter report not found",

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

            await CoverLetterReport.findOne({

                _id: reportId,

                userId,

            });



        if (!report) {

            throw new AppError(

                "Cover letter report not found",

                404

            );

        }



        await CoverLetterReport.deleteOne({

            _id: reportId,

        });


    }



}
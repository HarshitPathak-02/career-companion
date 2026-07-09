import { JobApplication } from "../models/jobs.model.js";
import { Resume } from "../models/resume.model.js";

import { AppError } from "../utils/app-error.js";

import type {
    CreateJobInput,
    UpdateJobInput,
    UpdateJobStatusInput,
} from "../validations/jobs.validation.js";


export class JobService {


    static async createJob(
        userId: string,
        data: CreateJobInput
    ) {


        if (data.resumeId) {

            const resume =
                await Resume.findOne({

                    _id: data.resumeId,

                    userId,

                });


            if (!resume) {

                throw new AppError(
                    "Resume not found",
                    404
                );

            }

        }



        const job =
            await JobApplication.create({

                userId,

                company: data.company,

                role: data.role,

                jobType: data.jobType,

                status: data.status,

                ...(data.location && {
                    location: data.location,
                }),

                ...(data.jobUrl && {
                    jobUrl: data.jobUrl,
                }),

                ...(data.description && {
                    description: data.description,
                }),

                ...(data.appliedDate && {
                    appliedDate: data.appliedDate,
                }),

                ...(data.resumeId && {
                    resumeId: data.resumeId,
                }),

                ...(data.notes && {
                    notes: data.notes,
                }),

            });



        return job;

    }





    static async getJobs(
        userId: string
    ) {

        return JobApplication
            .find({
                userId,
            })
            .sort({
                createdAt: -1,
            });

    }





    static async getJobById(
        userId: string,
        jobId: string
    ) {

        const job =
            await JobApplication.findOne({

                _id: jobId,

                userId,

            });



        if (!job) {

            throw new AppError(
                "Job application not found",
                404
            );

        }


        return job;

    }





    static async updateJob(
        userId: string,
        jobId: string,
        data: UpdateJobInput
    ) {

        const job =
            await JobApplication.findOneAndUpdate(

                {
                    _id: jobId,
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


        if (!job) {

            throw new AppError(
                "Job application not found",
                404
            );

        }


        return job;

    }





    static async updateStatus(
        userId: string,
        jobId: string,
        data: UpdateJobStatusInput
    ) {

        return this.updateJob(
            userId,
            jobId,
            {
                status: data.status,
            }
        );

    }





    static async deleteJob(
        userId: string,
        jobId: string
    ) {

        const job =
            await JobApplication.findOneAndDelete({

                _id: jobId,

                userId,

            });


        if (!job) {

            throw new AppError(
                "Job application not found",
                404
            );

        }


        return null;

    }

}
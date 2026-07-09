import { Interview } from "../models/interview.model.js";
import { JobApplication } from "../models/jobs.model.js";

import { AppError } from "../utils/app-error.js";

import type {
    CreateInterviewInput,
    UpdateInterviewInput,
    UpdateInterviewStatusInput,
} from "../validations/interview.validation.js";


export class InterviewService {


    static async createInterview(
        userId: string,
        data: CreateInterviewInput
    ) {


        if (data.jobId) {

            const job =
                await JobApplication.findOne({

                    _id: data.jobId,

                    userId,

                });


            if (!job) {

                throw new AppError(
                    "Job application not found",
                    404
                );

            }

        }



        const interview =
            await Interview.create({

                userId,

                company: data.company,

                role: data.role,

                round: data.round,

                type: data.type,

                scheduledAt: data.scheduledAt,

                mode: data.mode,

                status: data.status,


                ...(data.jobId && {
                    jobId: data.jobId,
                }),


                ...(data.meetingLink && {
                    meetingLink: data.meetingLink,
                }),


                ...(data.location && {
                    location: data.location,
                }),


                ...(data.notes && {
                    notes: data.notes,
                }),


                ...(data.feedback && {
                    feedback: data.feedback,
                }),

            });



        return interview;

    }





    static async getInterviews(
        userId: string
    ) {


        return Interview
            .find({
                userId,
            })
            .sort({
                scheduledAt: 1,
            });

    }





    static async getInterviewById(
        userId: string,
        interviewId: string
    ) {


        const interview =
            await Interview.findOne({

                _id: interviewId,

                userId,

            });



        if (!interview) {

            throw new AppError(
                "Interview not found",
                404
            );

        }



        return interview;

    }





    static async updateInterview(
        userId: string,
        interviewId: string,
        data: UpdateInterviewInput
    ) {


        const interview =
            await Interview.findOneAndUpdate(

                {
                    _id: interviewId,

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



        if (!interview) {

            throw new AppError(
                "Interview not found",
                404
            );

        }



        return interview;

    }





    static async updateStatus(
        userId: string,
        interviewId: string,
        data: UpdateInterviewStatusInput
    ) {


        return this.updateInterview(

            userId,

            interviewId,

            {
                status: data.status,
            }

        );

    }





    static async deleteInterview(
        userId: string,
        interviewId: string
    ) {


        const interview =
            await Interview.findOneAndDelete({

                _id: interviewId,

                userId,

            });



        if (!interview) {

            throw new AppError(
                "Interview not found",
                404
            );

        }



        return null;

    }

}
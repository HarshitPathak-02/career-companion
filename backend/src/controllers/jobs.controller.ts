import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/app-error.js";

import { JobService } from "../services/jobs.service.js";


export const createJob = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const job =
            await JobService.createJob(
                req.user.id,
                req.body
            );


        return res.status(201).json(

            successResponse(
                "Job application created successfully",
                job
            )

        );

    }
);



export const getJobs = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {


        const jobs =
            await JobService.getJobs(
                req.user.id
            );


        return res.status(200).json(

            successResponse(
                "Job applications fetched successfully",
                jobs
            )

        );

    }
);





export const getJobById = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {


        const { id: jobId } =
            req.params;



        if (
            typeof jobId !== "string"
        ) {

            throw new AppError(
                "Invalid Job ID",
                400
            );

        }



        const job =
            await JobService.getJobById(

                req.user.id,

                jobId

            );



        return res.status(200).json(

            successResponse(
                "Job application fetched successfully",
                job
            )

        );

    }
);





export const updateJob = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {


        const { id: jobId } =
            req.params;



        if (
            typeof jobId !== "string"
        ) {

            throw new AppError(
                "Invalid Job ID",
                400
            );

        }



        const job =
            await JobService.updateJob(

                req.user.id,

                jobId,

                req.body

            );



        return res.status(200).json(

            successResponse(
                "Job application updated successfully",
                job
            )

        );

    }
);





export const updateJobStatus = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {


        const { id: jobId } =
            req.params;



        if (
            typeof jobId !== "string"
        ) {

            throw new AppError(
                "Invalid Job ID",
                400
            );

        }



        const job =
            await JobService.updateStatus(

                req.user.id,

                jobId,

                req.body

            );



        return res.status(200).json(

            successResponse(
                "Job status updated successfully",
                job
            )

        );

    }
);





export const deleteJob = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {


        const { id: jobId } =
            req.params;



        if (
            typeof jobId !== "string"
        ) {

            throw new AppError(
                "Invalid Job ID",
                400
            );

        }



        await JobService.deleteJob(

            req.user.id,

            jobId

        );



        return res.status(200).json(

            successResponse(
                "Job application deleted successfully"
            )

        );

    }
);
import { z } from "zod";


const objectIdSchema =
    z
        .string()
        .trim()
        .regex(
            /^[a-fA-F0-9]{24}$/,
            "Invalid ObjectId"
        );


export const jobStatusEnum =
    z.enum([
        "Saved",
        "Applied",
        "OA",
        "Interview",
        "Offer",
        "Rejected",
        "Withdrawn",
    ]);



export const jobTypeEnum =
    z.enum([
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Freelance",
    ]);



export const createJobSchema =
    z.object({

        company:
            z
                .string()
                .trim()
                .min(2)
                .max(100),


        role:
            z
                .string()
                .trim()
                .min(2)
                .max(100),


        jobType:
            jobTypeEnum,


        location:
            z
                .string()
                .trim()
                .max(100)
                .optional(),


        jobUrl:
            z
                .string()
                .trim()
                .url()
                .optional(),


        description:
            z
                .string()
                .trim()
                .max(10000)
                .optional(),


        status:
            jobStatusEnum
                .default("Saved"),


        appliedDate:
            z
                .coerce
                .date()
                .optional(),


        resumeId:
            objectIdSchema
                .optional(),


        notes:
            z
                .string()
                .trim()
                .max(2000)
                .optional(),

    });



export const updateJobSchema =
    createJobSchema.partial();



export const updateJobStatusSchema =
    z.object({

        status:
            jobStatusEnum,

    });



export type CreateJobInput =
    z.infer<typeof createJobSchema>;


export type UpdateJobInput =
    z.infer<typeof updateJobSchema>;


export type UpdateJobStatusInput =
    z.infer<typeof updateJobStatusSchema>;
import { z } from "zod";



const objectIdSchema =
    z
        .string()
        .trim()
        .regex(
            /^[a-fA-F0-9]{24}$/,
            "Invalid ObjectId"
        );



export const interviewTypeEnum =
    z.enum([
        "HR",
        "Technical",
        "Machine Coding",
        "System Design",
        "Managerial",
        "Behavioral",
    ]);



export const interviewModeEnum =
    z.enum([
        "Online",
        "Offline",
    ]);



export const interviewStatusEnum =
    z.enum([
        "Scheduled",
        "Completed",
        "Passed",
        "Failed",
        "Cancelled",
    ]);




export const createInterviewSchema =
    z.object({


        jobId:
            objectIdSchema
                .optional(),


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



        round:
            z
                .string()
                .trim()
                .min(2)
                .max(100),



        type:
            interviewTypeEnum,



        scheduledAt:
            z.coerce.date(),



        mode:
            interviewModeEnum,



        meetingLink:
            z
                .string()
                .trim()
                .url()
                .optional(),



        location:
            z
                .string()
                .trim()
                .max(200)
                .optional(),



        notes:
            z
                .string()
                .trim()
                .max(2000)
                .optional(),


        feedback:
            z
                .string()
                .trim()
                .max(5000)
                .optional(),



        status:
            interviewStatusEnum
                .default("Scheduled"),

    });



export const updateInterviewSchema =
    createInterviewSchema.partial();



export const updateInterviewStatusSchema =
    z.object({

        status:
            interviewStatusEnum,

    });



export type CreateInterviewInput =
    z.infer<typeof createInterviewSchema>;


export type UpdateInterviewInput =
    z.infer<typeof updateInterviewSchema>;


export type UpdateInterviewStatusInput =
    z.infer<typeof updateInterviewStatusSchema>;
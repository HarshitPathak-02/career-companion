import { z } from "zod";


export const paginationQuerySchema = z.object({

    page: z
        .coerce
        .number()
        .int()
        .min(1)
        .optional(),


    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .optional(),


    search: z
        .string()
        .trim()
        .min(1)
        .optional(),


    sort: z
        .string()
        .regex(
            /^-?[a-zA-Z]+$/,
            "Invalid sort format"
        )
        .optional(),

});


export type PaginationQuery =
    z.infer<typeof paginationQuerySchema>;
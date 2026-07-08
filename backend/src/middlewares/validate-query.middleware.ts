import {
    Request,
    Response,
    NextFunction,
} from "express";

import type { ZodSchema } from "zod";


export const validateQuery =
(
    schema: ZodSchema
) =>
(
    req: Request,
    _res: Response,
    next: NextFunction
) => {

    const result =
        schema.safeParse(
            req.query
        );


    if (!result.success) {

        return next({
            statusCode: 400,
            message: "Invalid query parameters",
            errors: result.error.issues,
        });

    }


    Object.assign(
        req.query,
        result.data
    );


    next();
};
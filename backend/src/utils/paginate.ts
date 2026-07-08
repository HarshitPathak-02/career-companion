import type {
    Model,
} from "mongoose";

import { getPagination } from "./pagination.js";

interface PaginateOptions {
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
}


export const paginate = async <T>(
    model: Model<T>,
    filter: Record<string, unknown>,
    options: PaginateOptions = {}
) => {

    const {
        page,
        limit,
        skip,
    } = getPagination(options);


    const sort =
        options.sort ?? {
            createdAt: -1,
        };


    const [
        data,
        total,
    ] = await Promise.all([

        model
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort),


        model.countDocuments(filter)

    ]);


    return {
        data,

        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(
                total / limit
            ),
        },
    };
};
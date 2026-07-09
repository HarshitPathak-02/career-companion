import { Types } from "mongoose";

import { Activity } from "../models/activity.model.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    ActivityAction,
    ActivityEntity,
} from "../types/activity.types.js";

export class ActivityService {

    static async log(data: {
        userId: string;
        action: ActivityAction;
        entity: ActivityEntity;
        entityId?: string;
        metadata?: Record<string, unknown>;
        ipAddress?: string;
        userAgent?: string;
    }) {

        const activityData = {

            userId: data.userId,

            action: data.action,

            entity: data.entity,

            ...(data.entityId && {
                entityId: new Types.ObjectId(
                    data.entityId
                ),
            }),

            ...(data.metadata && {
                metadata: data.metadata,
            }),

            ...(data.ipAddress && {
                ipAddress: data.ipAddress,
            }),

            ...(data.userAgent && {
                userAgent: data.userAgent,
            }),
        };

        return Activity.create(activityData);

    }

    static async getActivities(
        userId: string,
        options: {
            page?: number;
            limit?: number;
            search?: string;
            sort?: string;
        }
    ) {

        const searchQuery =
            buildSearchQuery(
                [
                    "action",
                    "entity",
                ],
                options.search
            );

        return paginate(
            Activity,
            {
                userId,
                ...searchQuery,
            },
            {
                ...(options.page !== undefined && {
                    page: options.page,
                }),

                ...(options.limit !== undefined && {
                    limit: options.limit,
                }),

                sort:
                    buildSortQuery(
                        options.sort
                    ),
            }
        );

    }

}
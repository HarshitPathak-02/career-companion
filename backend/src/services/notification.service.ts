import { Notification } from "../models/notification.model.js";
import { AppError } from "../utils/app-error.js";
import { paginate } from "../utils/paginate.js";
import {
    buildSearchQuery,
    buildSortQuery,
} from "../utils/query.js";

import type {
    INotification,
    NotificationType,
} from "../types/notification.types.js";

export class NotificationService {

    // Internal use only
    static async createNotification(data: {
        userId: string;
        title: string;
        message: string;
        type?: NotificationType;
        metadata?: Record<string, unknown>;
    }) {

        const notificationData = {

            userId: data.userId,

            title: data.title,

            message: data.message,

            type: data.type ?? "system",

            ...(data.metadata !== undefined && {
                metadata: data.metadata,
            }),
        };

        return Notification.create(notificationData);
    }

    static async getNotifications(
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
                ["title", "message"],
                options.search
            );

        return paginate(
            Notification,
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
                    buildSortQuery(options.sort),
            }
        );

    }

    static async markAsRead(
        userId: string,
        notificationId: string
    ) {

        const notification =
            await Notification.findOneAndUpdate(
                {
                    _id: notificationId,
                    userId,
                },
                {
                    isRead: true,
                },
                {
                    new: true,
                }
            );

        if (!notification) {
            throw new AppError(
                "Notification not found",
                404
            );
        }

        return notification;

    }

    static async markAllAsRead(
        userId: string
    ) {

        await Notification.updateMany(
            {
                userId,
                isRead: false,
            },
            {
                isRead: true,
            }
        );

        return null;

    }

    static async deleteNotification(
        userId: string,
        notificationId: string
    ) {

        const notification =
            await Notification.findOneAndDelete({
                _id: notificationId,
                userId,
            });

        if (!notification) {
            throw new AppError(
                "Notification not found",
                404
            );
        }

        return null;

    }

}
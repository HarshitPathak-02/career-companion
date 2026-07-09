import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/app-error.js";
import { NotificationService } from "../services/notification.service.js";

export const getNotifications = asyncHandler(
    async (req: Request, res: Response) => {

        const result =
            await NotificationService.getNotifications(
                req.user.id,
                {

                    ...(req.query.page && {
                        page: Number(req.query.page),
                    }),

                    ...(req.query.limit && {
                        limit: Number(req.query.limit),
                    }),

                    ...(typeof req.query.search === "string" && {
                        search: req.query.search,
                    }),

                    ...(typeof req.query.sort === "string" && {
                        sort: req.query.sort,
                    }),

                }
            );

        return res.status(200).json(
            successResponse(
                "Notifications fetched successfully",
                result
            )
        );

    }
);

export const markNotificationAsRead =
    asyncHandler(
        async (
            req: Request,
            res: Response
        ) => {

            const notificationId =
                req.params.id;

            if (
                typeof notificationId !==
                "string"
            ) {
                throw new AppError(
                    "Invalid notification id",
                    400
                );
            }

            const notification =
                await NotificationService.markAsRead(
                    req.user.id,
                    notificationId
                );

            return res.status(200).json(
                successResponse(
                    "Notification marked as read",
                    notification
                )
            );

        }
    );

export const markAllNotificationsAsRead =
    asyncHandler(
        async (
            req: Request,
            res: Response
        ) => {

            await NotificationService.markAllAsRead(
                req.user.id
            );

            return res.status(200).json(
                successResponse(
                    "All notifications marked as read"
                )
            );

        }
    );

export const deleteNotification =
    asyncHandler(
        async (
            req: Request,
            res: Response
        ) => {

            const notificationId =
                req.params.id;

            if (
                typeof notificationId !==
                "string"
            ) {
                throw new AppError(
                    "Invalid notification id",
                    400
                );
            }

            await NotificationService.deleteNotification(
                req.user.id,
                notificationId
            );

            return res.status(200).json(
                successResponse(
                    "Notification deleted successfully"
                )
            );

        }
    );
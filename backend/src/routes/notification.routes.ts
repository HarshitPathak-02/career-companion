import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { validateQuery } from "../middlewares/validate-query.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";

import { paginationQuerySchema } from "../validations/query.validation.js";

import {
    markNotificationReadSchema,
} from "../validations/notification.validation.js";

const router = Router();

router.get(
    "/",
    protect,
    validateQuery(
        paginationQuerySchema
    ),
    getNotifications
);

router.patch(
    "/:id/read",
    protect,
    validate(
        markNotificationReadSchema
    ),
    markNotificationAsRead
);

router.patch(
    "/read-all",
    protect,
    markAllNotificationsAsRead
);

router.delete(
    "/:id",
    protect,
    deleteNotification
);

export default router;
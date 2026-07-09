import { z } from "zod";

export const markNotificationReadSchema =
    z.object({
        isRead: z.literal(true),
    });

export type MarkNotificationReadInput =
    z.infer<typeof markNotificationReadSchema>;
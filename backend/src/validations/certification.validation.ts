import { z } from "zod";

const certificationSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2)
        .max(150),

    issuingOrganization: z
        .string()
        .trim()
        .min(2)
        .max(150),

    issueDate: z.coerce.date(),

    expiryDate: z
        .coerce
        .date()
        .optional(),

    credentialId: z
        .string()
        .trim()
        .max(100)
        .optional(),

    credentialUrl: z
        .url("Invalid Credential URL")
        .optional(),

    doesNotExpire: z
        .boolean()
        .default(false),

});

export const createCertificationSchema =
    certificationSchema.superRefine((data, ctx) => {

        if (
            !data.doesNotExpire &&
            !data.expiryDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["expiryDate"],
                message:
                    "Expiry date is required.",
            });
        }

        if (
            data.expiryDate &&
            data.expiryDate < data.issueDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["expiryDate"],
                message:
                    "Expiry date cannot be before issue date.",
            });
        }

    });

export const updateCertificationSchema =
    certificationSchema.partial();

export type CreateCertificationInput =
    z.infer<typeof createCertificationSchema>;

export type UpdateCertificationInput =
    z.infer<typeof updateCertificationSchema>;
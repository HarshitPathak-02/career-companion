import type { Types } from "mongoose";

export interface ICertification {

    userId: Types.ObjectId;

    name: string;

    issuingOrganization: string;

    issueDate: Date;

    expiryDate?: Date;

    credentialId?: string;

    credentialUrl?: string;

    doesNotExpire: boolean;

    createdAt?: Date;

    updatedAt?: Date;
}
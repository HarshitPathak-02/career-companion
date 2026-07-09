import { HydratedDocument, Types } from "mongoose";

export interface ILanguage {
    name: string;

    proficiency:
        | "Beginner"
        | "Intermediate"
        | "Professional"
        | "Native";
}

export interface ISocialLinks {

    github?: string;

    linkedin?: string;

    portfolio?: string;

    leetcode?: string;

    codeforces?: string;

    codechef?: string;

    hackerrank?: string;

    geeksforgeeks?: string;

    x?: string;
}

export interface IProfile {

    userId: Types.ObjectId;

    headline?: string;

    bio?: string;

    phone?: string;

    dateOfBirth?: Date;

    gender?: "male" | "female" | "other";

    location?: string;

    languages: ILanguage[];

    socialLinks: ISocialLinks;

    profileCompletion: number;
}

export type ProfileDocument =
    HydratedDocument<IProfile>;
import type { Types } from "mongoose";
import type { IEducation } from "./education.types.js";
import type { IExperience } from "./experience.types.js";
import type { IProject } from "./project.types.js";
import type { ISkill } from "./skill.types.js";
import type { ICertification } from "./certification.types.js";
import type { IAchievement } from "./achievement.types.js";
import type { IResume } from "./resume.types.js";

export interface PopulatedResume
    extends Omit<
        IResume,
        | "educationIds"
        | "experienceIds"
        | "projectIds"
        | "skillIds"
        | "certificationIds"
        | "achievementIds"
    > {

    _id: Types.ObjectId;

    educationIds: IEducation[];

    experienceIds: IExperience[];

    projectIds: IProject[];

    skillIds: ISkill[];

    certificationIds: ICertification[];

    achievementIds: IAchievement[];

}


export type ResumeAITask =
    | "ats"
    | "skill-gap"
    | "interview"
    | "cover-letter"
    | "resume-review"


export interface AIContextSection {

    title: string;

    content: string;

}
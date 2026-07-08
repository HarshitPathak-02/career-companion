import { HydratedDocument, Types } from "mongoose";

export interface ISkill {
  userId: Types.ObjectId;

  name: string;

  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  yearsOfExperience: number;
}

export type SkillDocument =
  HydratedDocument<ISkill>;
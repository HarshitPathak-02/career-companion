import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { SkillService } from "../services/skill.service.js";
import { AppError } from "../utils/app-error.js";


export const createSkill = asyncHandler(
    async (req: Request, res: Response) => {

        const skill = await SkillService.createSkill(
            req.user.id,
            req.body
        );


        return res.status(201).json(
            successResponse(
                "Skill created successfully",
                skill
            )
        );
    }
);



export const getSkills = asyncHandler(
    async (req: Request, res: Response) => {


        const result =
            await SkillService.getSkills(
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
                "Skills fetched successfully",
                result
            )
        );
    }
);




export const updateSkill = asyncHandler(
    async (req: Request, res: Response) => {


        const skillId = req.params.id;


        if (typeof skillId !== "string") {
            throw new AppError(
                "Invalid Skill ID",
                400
            );
        }


        const skill =
            await SkillService.updateSkill(
                req.user.id,
                skillId,
                req.body
            );


        return res.status(200).json(
            successResponse(
                "Skill updated successfully",
                skill
            )
        );
    }
);




export const deleteSkill = asyncHandler(
    async (req: Request, res: Response) => {


        const skillId = req.params.id;


        if (typeof skillId !== "string") {
            throw new AppError(
                "Invalid Skill ID",
                400
            );
        }


        await SkillService.deleteSkill(
            req.user.id,
            skillId
        );


        return res.status(200).json(
            successResponse(
                "Skill deleted successfully"
            )
        );
    }
);
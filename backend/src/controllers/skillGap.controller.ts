import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { SkillGapService } from "../services/skillGap.service.js";

import type {
    AnalyzeSkillGapRequestInput,
} from "../validations/skillGap.validation.js";

export class SkillGapController {

    static async analyzeSkillGap(
        req: Request<
            {},
            {},
            AnalyzeSkillGapRequestInput
        >,
        res: Response,
        next: NextFunction,
    ) {

        try {

            const report =
                await SkillGapService.analyzeSkillGap(

                    req.user.id,

                    req.body,

                );

            res.status(201).json({

                success: true,

                message:
                    "Skill gap analysis completed successfully.",

                data: report,

            });

        } catch (error) {

            next(error);

        }

    }

    static async getReports(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {

        try {

            const reports =
                await SkillGapService.getReports(

                    req.user.id,

                    {

                        ...(req.query.page && {
                            page: Number(req.query.page),
                        }),

                        ...(req.query.limit && {
                            limit: Number(req.query.limit),
                        }),

                        ...(req.query.search && {
                            search: req.query.search as string,
                        }),

                        ...(req.query.sort && {
                            sort: req.query.sort as string,
                        }),

                    },

                );

            res.status(200).json({

                success: true,

                data: reports,

            });

        } catch (error) {

            next(error);

        }

    }

    static async getReportById(
        req: Request<
            {
                reportId: string;
            }
        >,
        res: Response,
        next: NextFunction,
    ) {

        try {

            const report =
                await SkillGapService.getReportById(

                    req.user.id,

                    req.params.reportId,

                );

            res.status(200).json({

                success: true,

                data: report,

            });

        } catch (error) {

            next(error);

        }

    }

    static async deleteReport(
        req: Request<
            {
                reportId: string;
            }
        >,
        res: Response,
        next: NextFunction,
    ) {

        try {

            await SkillGapService.deleteReport(

                req.user.id,

                req.params.reportId,

            );

            res.status(200).json({

                success: true,

                message:
                    "Skill gap report deleted successfully.",

            });

        } catch (error) {

            next(error);

        }

    }

}
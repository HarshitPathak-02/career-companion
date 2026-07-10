import { AIExecutor } from "../ai/executor/ai.executor.js";

import { PromptManager } from "../ai/prompts/prompt.manager.js";

import { ATSParser } from "../ai/parsers/ats.parser.js";
import { SkillGapParser } from "../ai/parsers/skillGap.parser.js";
import { ResumeReviewParser } from "../ai/parsers/resumeReview.parser.js";

import type {
    PopulatedResume,
} from "../types/resumeAI.types.js";

import type {
    ATSAIResponse,
} from "../validations/ats.validation.js";

import type {
    SkillGapAIResponse,
} from "../validations/skillGap.validation.js";

import type {
    ResumeReviewAIResponse,
} from "../validations/resumeReview.validation.js";
import { InterviewParser } from "../ai/parsers/interview.parser.js";
import { InterviewAIResponse } from "../validations/interviewAI.validation.js";
import { CoverLetterParser } from "../ai/parsers/coverLetter.parser.js";
import { CoverLetterResponse } from "../validations/coverLetter.validation.js";

export class ResumeAIEngine {

    /**
     * Parser Registry
     */
    private static readonly parsers = {

        ats: new ATSParser(),

        skillGap: new SkillGapParser(),

        resumeReview: new ResumeReviewParser(),

        interview:
            new InterviewParser(),

        coverLetter:
            new CoverLetterParser(),


    };

    /**
     * ATS Analysis
     */
    static async analyzeResume(

        resume: PopulatedResume,

        jobDescription: string,

    ): Promise<ATSAIResponse> {

        const messages =
            PromptManager.buildMessages(

                resume,

                "ats",

                jobDescription,

            );

        return AIExecutor.execute({

            messages,

            parser:
                this.parsers.ats,

        });

    }

    /**
     * Skill Gap Analysis
     */
    static async analyzeSkillGap(

        resume: PopulatedResume,

        jobDescription: string,

    ): Promise<SkillGapAIResponse> {

        const messages =
            PromptManager.buildMessages(

                resume,

                "skill-gap",

                jobDescription,

            );

        return AIExecutor.execute({

            messages,

            parser:
                this.parsers.skillGap,

        });

    }

    /**
     * Resume Review
     */
    static async analyzeResumeReview(

        resume: PopulatedResume,

    ): Promise<ResumeReviewAIResponse> {

        const messages =
            PromptManager.buildMessages(

                resume,

                "resume-review",

            );

        return AIExecutor.execute({

            messages,

            parser:
                this.parsers.resumeReview,

        });

    }

    static async generateInterview(

        resume: PopulatedResume,

    ): Promise<InterviewAIResponse> {


        const messages =

            PromptManager.buildMessages(

                resume,

                "interview",

            );



        return AIExecutor.execute({

            messages,

            parser:
                this.parsers.interview,

        });


    }

    static async generateCoverLetter(

        resume: PopulatedResume,

        jobDescription: string,

    ): Promise<CoverLetterResponse> {


        const messages =

            PromptManager.buildMessages(

                resume,

                "cover-letter",

                jobDescription

            );



        return AIExecutor.execute({

            messages,

            parser:
                this.parsers.coverLetter,

        });


    }

}
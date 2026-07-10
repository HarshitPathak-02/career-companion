import type { AIMessage } from "../ai.types.js";

import type {
    PopulatedResume,
    ResumeAITask,
} from "../../types/resumeAI.types.js";

import { ResumeAIContextBuilder } from "../builders/resumeAIContext.builder.js";

import { ATS_SYSTEM_PROMPT } from "./ats.prompt.js";
import { SKILL_GAP_SYSTEM_PROMPT } from "./skillGap.prompt.js";
import { INTERVIEW_SYSTEM_PROMPT } from "./interview.prompt.js";
import { COVER_LETTER_SYSTEM_PROMPT } from "./coverLetter.prompt.js";
import {RESUME_REVIEW_SYSTEM_PROMPT} from "./resumeReview.prompt.js";

export class PromptManager {
    private static readonly SYSTEM_PROMPTS: Record<
        ResumeAITask,
        string
    > = {

            ats: ATS_SYSTEM_PROMPT,

            "skill-gap": SKILL_GAP_SYSTEM_PROMPT,

            "resume-review": RESUME_REVIEW_SYSTEM_PROMPT,

            interview: INTERVIEW_SYSTEM_PROMPT,

            "cover-letter": COVER_LETTER_SYSTEM_PROMPT,
            

        };
    static buildMessages(

        resume: PopulatedResume,

        task: ResumeAITask,

        additionalContext?: string,

    ): AIMessage[] {
        const context = ResumeAIContextBuilder.build(
            resume,
            task,
        );
        const systemPrompt =

            this.SYSTEM_PROMPTS[task];
        const userPrompt = [

            "# Resume Context",

            context,

            additionalContext
                ? `# Additional Context

${additionalContext}`
                : null,

        ]
            .filter(Boolean)
            .join("\n\n");

        return [

            {

                role: "system",

                content: systemPrompt,

            },

            {

                role: "user",

                content: userPrompt,

            },

        ];
    }

}
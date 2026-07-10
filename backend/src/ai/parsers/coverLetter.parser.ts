import {
    CoverLetterResponseSchema,
    CoverLetterResponse,
} from "../../validations/coverLetter.validation.js";

import type {
    AIParser,
} from "../index.js";

export class CoverLetterParser
    implements AIParser<CoverLetterResponse> {

    parse(content: string): CoverLetterResponse {

        const cleaned = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const json = JSON.parse(cleaned);

        const coverLetter =
            json.cover_letter ?? json;

        return CoverLetterResponseSchema.parse({

            opening:
                coverLetter.opening,

            introduction:
                coverLetter.introduction,

            experienceConnection:
                coverLetter.experienceConnection ??
                coverLetter.experience_connection,

            projectHighlights:
                coverLetter.projectHighlights ??
                coverLetter.project_highlights,

            technicalStrengths:
                coverLetter.technicalStrengths ??
                coverLetter.technical_strengths,

            closing:
                coverLetter.closing,

            fullContent:
                coverLetter.fullContent ??
                coverLetter.full_content,

        });

    }

}
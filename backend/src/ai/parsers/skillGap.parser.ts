import { BaseParser } from "./base.parser.js";

import type { AIParser } from "./parser.types.js";

import { AIParserError } from "./parser.error.js";

import {
    skillGapAIResponseSchema,
    type SkillGapAIResponse,
} from "../../validations/skillGap.validation.js";

export class SkillGapParser
    extends BaseParser
    implements AIParser<SkillGapAIResponse> {

    parse(
        response: string,
    ): SkillGapAIResponse {

        try {

            const parsed =
                this.parseJSON(response);

            return skillGapAIResponseSchema.parse(
                parsed,
            );

        } catch (error) {

            if (error instanceof AIParserError) {
                throw error;
            }

            throw new AIParserError(
                "Skill Gap response validation failed.",
            );

        }

    }

}
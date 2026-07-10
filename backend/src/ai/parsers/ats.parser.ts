import type { AIParser } from "./parser.types.js";
import { BaseParser } from "./base.parser.js";
import { AIParserError } from "./parser.error.js";

import {
    atsAIResponseSchema,
    type ATSAIResponse,
} from "../../validations/ats.validation.js";

export class ATSParser
    extends BaseParser
    implements AIParser<ATSAIResponse> {

    parse(
        response: string,
    ): ATSAIResponse {

        try {

            const parsed =
                this.parseJSON(response);

            return atsAIResponseSchema.parse(parsed);

        } catch (error) {

            if (error instanceof AIParserError) {
                throw error;
            }

            throw new AIParserError(
                "ATS response validation failed."
            );

        }

    }

}
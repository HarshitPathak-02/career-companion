import { AIParserError } from "./parser.error.js";

export abstract class BaseParser {

    protected parseJSON<T>(
        response: string,
    ): T {

        try {

            const cleaned =
                this.cleanResponse(response);

            return JSON.parse(cleaned) as T;

        } catch {

            throw new AIParserError(
                "Invalid JSON returned by AI."
            );

        }

    }

    protected cleanResponse(
        response: string,
    ): string {

        return response
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/i, "")
            .trim();

    }

}
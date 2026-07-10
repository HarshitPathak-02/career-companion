export interface ResumeReviewResult {

    strengths: string[];

    weaknesses: string[];

    suggestions: string[];

}

export class AIResponseParser {

    static parseResumeReview(

        response: string

    ): ResumeReviewResult {

        const result: ResumeReviewResult = {

            strengths: [],

            weaknesses: [],

            suggestions: [],

        };

        let current:

            | "strengths"

            | "weaknesses"

            | "suggestions"

            | null = null;

        const lines =

            response

                .split("\n")

                .map(

                    line => line.trim()

                );

        for (

            const line of lines

        ) {

            const lower =

                line.toLowerCase();

            if (

                lower.startsWith("strength")

            ) {

                current = "strengths";

                continue;

            }

            if (

                lower.startsWith("weak")

            ) {

                current = "weaknesses";

                continue;

            }

            if (

                lower.startsWith("suggest")

            ) {

                current = "suggestions";

                continue;

            }

            if (

                line.startsWith("-")

                ||

                line.startsWith("*")

            ) {

                if (!current) {

                    continue;

                }

                result[current].push(

                    line.replace(

                        /^[-*]\s*/,

                        ""

                    )

                );

            }

        }

        return result;

    }

}
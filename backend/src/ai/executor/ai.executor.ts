import { AIService } from "../ai.service.js";

import type {
    AICompletionOptions,
    AIMessage,
} from "../ai.types.js";

import type { AIParser } from "../parsers/parser.types.js";
import { retryAI } from "../utils/aiRetry.js";

export interface AIExecutorOptions<T> {

    messages: AIMessage[];

    parser: AIParser<T>;

    completionOptions?: AICompletionOptions;

}


export class AIExecutor {

    static async execute<T>(
        options: AIExecutorOptions<T>,
    ): Promise<T> {

        return retryAI(async () => {

            const response =
                await AIService.complete(options.messages, options.completionOptions);

            return options.parser.parse(
                response.content,
            );

        });

    }

}
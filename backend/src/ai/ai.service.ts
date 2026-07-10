import { AIFactory } from "./ai.factory.js";
import { AICompletionResponse } from "./ai.types.js";
import {
    AIProvider,
    OpenAIProvider,
} from "./providers/index.js";

import { AICompletionOptions, AIMessage } from "./ai.types.js";

export class AIService {

    private static provider: AIProvider =
        AIFactory.getProvider();

    static setProvider(
        provider: AIProvider
    ): void {

        this.provider = provider;

    }

    static async complete(

        messages: AIMessage[],

        options?: AICompletionOptions,

    ): Promise<AICompletionResponse> {

        return this.provider.complete({

            messages,

            ...(options
                ? { options }
                : {}),

        });

    }

}
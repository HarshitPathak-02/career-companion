import OpenAI from "openai";

import {

    AIProvider,

} from "./ai.provider.js";
import { AICompletionResponse } from "../ai.types.js";

import { AICompletionRequest } from "../ai.types.js";

export class OpenAIProvider
    implements AIProvider {

    private client: OpenAI;

    constructor() {

        this.client = new OpenAI({

            apiKey: process.env.OPENAI_API_KEY,

        });

    }

    async complete(

        request: AICompletionRequest

    ): Promise<AICompletionResponse> {

        const completion =

            await this.client.chat.completions.create({

                model: "gpt-4.1-mini",

                messages: request.messages,

                ...(request.options ?? {}),

            });

        return {

            content:
                completion.choices[0]?.message.content ?? "",

            provider: "openai",

            model: "gpt-4.1-mini",

            ...(completion.usage?.total_tokens !== undefined && {

                tokensUsed:
                    completion.usage.total_tokens,

            }),
            

        };

    }

}
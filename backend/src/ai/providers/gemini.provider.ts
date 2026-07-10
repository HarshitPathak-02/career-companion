import { GoogleGenAI } from "@google/genai";

import type {
    AICompletionRequest,
    AICompletionResponse,
} from "../ai.types.js";

import type {
    AIProvider,
} from "./ai.provider.js";

export class GeminiProvider
    implements AIProvider {

    private client: GoogleGenAI;

    constructor() {

        this.client = new GoogleGenAI({

            apiKey:
                process.env.GEMINI_API_KEY!,

        });

    }

    async complete(

        request: AICompletionRequest,

    ): Promise<AICompletionResponse> {

        const systemInstruction =
            request.messages
                .filter(
                    message =>
                        message.role === "system",
                )
                .map(
                    message =>
                        message.content,
                )
                .join("\n");

        const userPrompt =
            request.messages
                .filter(
                    message =>
                        message.role !== "system",
                )
                .map(
                    message =>
                        `${message.role.toUpperCase()}:\n${message.content}`,
                )
                .join("\n\n");

        const response =
            await this.client.models.generateContent({

                model: "gemini-2.5-flash",

                contents: userPrompt,

                config: {

                    systemInstruction,

                    ...(request.options?.temperature !== undefined && {

                        temperature:
                            request.options.temperature,

                    }),

                    ...(request.options?.maxTokens !== undefined && {

                        maxOutputTokens:
                            request.options.maxTokens,

                    }),

                },

            });

        return {

            content:
                response.text ?? "",

            provider:
                "gemini",

            model:
                "gemini-2.5-flash",

        };

    }

}
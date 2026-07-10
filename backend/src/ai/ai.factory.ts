import type { AIProvider } from "./providers/ai.provider.js";

import { env } from "../config/env.js";

import { OpenAIProvider } from "./providers/openai.provider.js";
import { GeminiProvider } from "./providers/gemini.provider.js";

export class AIFactory {

    private static readonly openAIProvider =
        new OpenAIProvider();

    private static readonly geminiProvider =
        new GeminiProvider();

    static getProvider(): AIProvider {

        switch (env.AI_PROVIDER) {

            case "gemini":
                return this.geminiProvider;

            case "openai":
            default:
                return this.openAIProvider;

        }

    }

}
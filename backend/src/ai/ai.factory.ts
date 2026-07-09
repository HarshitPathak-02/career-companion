import type {
    AIProvider,
} from "./ai.provider.js";


import {
    env,
} from "../config/env.js";


import {
    OpenAIProvider,
} from "./providers/openai.provider.js";


import {
    GeminiProvider,
} from "./providers/gemini.provider.js";



export class AIFactory {


    static getProvider():
        AIProvider {


        switch(
            env.AI_PROVIDER
        ){

            case "gemini":

                return new GeminiProvider();



            case "openai":

            default:

                return new OpenAIProvider();

        }

    }


}
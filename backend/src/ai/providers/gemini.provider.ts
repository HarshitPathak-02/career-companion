import type {
    AIProvider,
} from "../ai.provider.js";


import type {
    AICompletionRequest,
    AICompletionResponse,
} from "../ai.types.js";



export class GeminiProvider
implements AIProvider {



    async generate(
        request: AICompletionRequest
    ):
    Promise<AICompletionResponse> {


        return {


            content:
                "AI response will be generated here",



            provider:
                "gemini",


        };

    }


}
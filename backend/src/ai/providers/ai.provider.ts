import { AICompletionRequest, AICompletionResponse } from "../ai.types.js";


export interface AIProvider {

    complete(
        request: AICompletionRequest
    ): Promise<AICompletionResponse>;

}
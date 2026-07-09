import type {
    AICompletionRequest,
    AICompletionResponse,
} from "./ai.types.js";



export interface AIProvider {


    generate(
        request: AICompletionRequest
    ):
    Promise<AICompletionResponse>;


}
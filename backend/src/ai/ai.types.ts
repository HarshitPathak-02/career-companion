export type AIProviderName =
    | "openai"
    | "huggingface"
    | "gemini";



export interface AIMessage {

    role:
        | "system"
        | "user"
        | "assistant";

    content: string;

}



export interface AICompletionOptions {

    temperature?: number;

    maxTokens?: number;

}



export interface AICompletionRequest {

    messages: AIMessage[];

    options?: AICompletionOptions;

}



export interface AICompletionResponse {

    content: string;

    provider: AIProviderName;

    tokensUsed?: number;

}
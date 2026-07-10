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

    model: string;

    tokensUsed?: number;

}

// export interface InterviewPreparationResponse {

//     technicalQuestions: string[];

//     behavioralQuestions: string[];

//     codingQuestions: string[];

// }

// export interface SkillGapResponse {

//     currentSkills: string[];

//     missingSkills: string[];

//     learningRoadmap: string[];

// }

// export interface ResumeReviewResponse {

//     strengths: string[];

//     weaknesses: string[];

//     suggestions: string[];

// }

export type AIJsonResponse =
    Record<string, unknown>;
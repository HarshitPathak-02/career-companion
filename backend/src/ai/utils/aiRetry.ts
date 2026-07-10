import { AI_CONFIG } from "../../config/ai.config.js";

const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export async function retryAI<T>(
    operation: () => Promise<T>,
): Promise<T> {

    let lastError: unknown;

    for (
        let attempt = 1;
        attempt <= AI_CONFIG.maxRetries;
        attempt++
    ) {

        try {

            return await operation();

        } catch (error) {

            lastError = error;

            if (
                attempt === AI_CONFIG.maxRetries ||
                !isRetryable(error)
            ) {

                throw error;

            }

            await sleep(AI_CONFIG.retryDelay);

        }

    }

    throw lastError;

}

function isRetryable(error: unknown): boolean {

    if (!(error instanceof Error)) {

        return false;

    }

    const anyError = error as Error & {

        status?: number;

        code?: string | number;

    };

    if (
        typeof anyError.status === "number" &&
        AI_CONFIG.retryableStatusCodes.includes(anyError.status)
    ) {

        return true;

    }

    const retryableCodes = [

        "ECONNRESET",

        "ETIMEDOUT",

        "ECONNREFUSED",

    ];

    if (
        typeof anyError.code === "string" &&
        retryableCodes.includes(anyError.code)
    ) {

        return true;

    }

    return false;

}
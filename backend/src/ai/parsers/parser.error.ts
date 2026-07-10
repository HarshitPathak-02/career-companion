export class AIParserError extends Error {

    constructor(
        message: string,
    ) {

        super(message);

        this.name = "AIParserError";

    }

}